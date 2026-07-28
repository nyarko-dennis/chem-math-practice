/**
 * Lightweight symbolic-equivalence checker for the small algebra grammar the
 * generators produce (numbers, single-letter variables, + - * /, powers,
 * parentheses, and \frac). Two expressions are considered equivalent if they
 * evaluate to the same value across many random assignments of their variables.
 *
 * This lets the app accept any algebraically-equivalent rearrangement instead
 * of demanding one exact LaTeX string.
 */

type Node =
  | { kind: 'num'; value: number }
  | { kind: 'var'; name: string }
  | { kind: 'neg'; arg: Node }
  | { kind: 'bin'; op: '+' | '-' | '*' | '/' | '^'; left: Node; right: Node };

type Tok =
  | { t: 'num'; v: number }
  | { t: 'var'; v: string }
  | { t: 'op'; v: '+' | '-' | '*' | '/' | '^' }
  | { t: 'lparen' }
  | { t: 'rparen' }
  | { t: 'lbrace' }
  | { t: 'rbrace' }
  | { t: 'frac' };

function tokenize(input: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  const s = input;
  while (i < s.length) {
    const c = s[i];
    if (c === ' ' || c === '\t' || c === '\n') {
      i++;
      continue;
    }
    if (c === '\\') {
      i++;
      let cmd = '';
      while (i < s.length && /[a-zA-Z]/.test(s[i])) cmd += s[i++];
      if (cmd === '') {
        // escaped punctuation such as \, or \! — skip the single char
        i++;
        continue;
      }
      if (cmd === 'frac') toks.push({ t: 'frac' });
      else if (cmd === 'cdot' || cmd === 'times') toks.push({ t: 'op', v: '*' });
      else if (cmd === 'div') toks.push({ t: 'op', v: '/' });
      // \left \right and any other command are structural/no-ops here.
      continue;
    }
    if (/[0-9.]/.test(c)) {
      let num = '';
      while (i < s.length && /[0-9.]/.test(s[i])) num += s[i++];
      toks.push({ t: 'num', v: parseFloat(num) });
      continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      toks.push({ t: 'var', v: c });
      i++;
      continue;
    }
    if (c === '+' || c === '-' || c === '*' || c === '/' || c === '^') {
      toks.push({ t: 'op', v: c });
      i++;
      continue;
    }
    if (c === '(') {
      toks.push({ t: 'lparen' });
      i++;
      continue;
    }
    if (c === ')') {
      toks.push({ t: 'rparen' });
      i++;
      continue;
    }
    if (c === '{') {
      toks.push({ t: 'lbrace' });
      i++;
      continue;
    }
    if (c === '}') {
      toks.push({ t: 'rbrace' });
      i++;
      continue;
    }
    // Unknown char (e.g. '=', ',') — treat as a hard boundary/skip.
    i++;
  }
  return toks;
}

class Parser {
  private pos = 0;
  private toks: Tok[];
  constructor(toks: Tok[]) {
    this.toks = toks;
  }

  private peek(): Tok | undefined {
    return this.toks[this.pos];
  }
  private next(): Tok | undefined {
    return this.toks[this.pos++];
  }

  parse(): Node {
    const node = this.expr();
    if (this.pos !== this.toks.length) throw new Error('unexpected trailing tokens');
    return node;
  }

  private expr(): Node {
    let left = this.term();
    for (;;) {
      const p = this.peek();
      if (p && p.t === 'op' && (p.v === '+' || p.v === '-')) {
        this.next();
        const right = this.term();
        left = { kind: 'bin', op: p.v, left, right };
      } else break;
    }
    return left;
  }

  private startsFactor(tok: Tok | undefined): boolean {
    if (!tok) return false;
    return (
      tok.t === 'num' ||
      tok.t === 'var' ||
      tok.t === 'lparen' ||
      tok.t === 'lbrace' ||
      tok.t === 'frac'
    );
  }

  private term(): Node {
    let left = this.factor();
    for (;;) {
      const p = this.peek();
      if (p && p.t === 'op' && (p.v === '*' || p.v === '/')) {
        this.next();
        const right = this.factor();
        left = { kind: 'bin', op: p.v, left, right };
      } else if (this.startsFactor(p)) {
        // implicit multiplication, e.g. "by" or "2x" or "3(a+b)"
        const right = this.factor();
        left = { kind: 'bin', op: '*', left, right };
      } else break;
    }
    return left;
  }

  private factor(): Node {
    const base = this.base();
    const p = this.peek();
    if (p && p.t === 'op' && p.v === '^') {
      this.next();
      const exp = this.factor(); // right-associative
      return { kind: 'bin', op: '^', left: base, right: exp };
    }
    return base;
  }

  private base(): Node {
    const tok = this.peek();
    if (!tok) throw new Error('unexpected end of input');
    if (tok.t === 'op' && tok.v === '-') {
      this.next();
      return { kind: 'neg', arg: this.base() };
    }
    if (tok.t === 'op' && tok.v === '+') {
      this.next();
      return this.base();
    }
    if (tok.t === 'num') {
      this.next();
      return { kind: 'num', value: tok.v };
    }
    if (tok.t === 'var') {
      this.next();
      return { kind: 'var', name: tok.v };
    }
    if (tok.t === 'lparen') {
      this.next();
      const e = this.expr();
      const close = this.next();
      if (!close || close.t !== 'rparen') throw new Error('expected )');
      return e;
    }
    if (tok.t === 'lbrace') {
      this.next();
      const e = this.expr();
      const close = this.next();
      if (!close || close.t !== 'rbrace') throw new Error('expected }');
      return e;
    }
    if (tok.t === 'frac') {
      this.next();
      const num = this.group();
      const den = this.group();
      return { kind: 'bin', op: '/', left: num, right: den };
    }
    throw new Error('unexpected token');
  }

  private group(): Node {
    const tok = this.peek();
    if (tok && tok.t === 'lbrace') {
      this.next();
      const e = this.expr();
      const close = this.next();
      if (!close || close.t !== 'rbrace') throw new Error('expected } in group');
      return e;
    }
    // \frac with a single-token argument (rare, but be lenient)
    return this.factor();
  }
}

export function parseExpression(latex: string): Node {
  return new Parser(tokenize(latex)).parse();
}

function collectVars(node: Node, out: Set<string>): void {
  switch (node.kind) {
    case 'var':
      out.add(node.name);
      break;
    case 'neg':
      collectVars(node.arg, out);
      break;
    case 'bin':
      collectVars(node.left, out);
      collectVars(node.right, out);
      break;
  }
}

function evalNode(node: Node, env: Record<string, number>): number {
  switch (node.kind) {
    case 'num':
      return node.value;
    case 'var':
      return env[node.name];
    case 'neg':
      return -evalNode(node.arg, env);
    case 'bin': {
      const l = evalNode(node.left, env);
      const r = evalNode(node.right, env);
      switch (node.op) {
        case '+':
          return l + r;
        case '-':
          return l - r;
        case '*':
          return l * r;
        case '/':
          return l / r;
        case '^':
          return Math.pow(l, r);
      }
    }
  }
}

/**
 * True if two expressions are algebraically equivalent, tested numerically.
 * Returns false if either side fails to parse (e.g. malformed student input).
 */
export function areEquivalent(expected: string, actual: string): boolean {
  let expNode: Node;
  let actNode: Node;
  try {
    expNode = parseExpression(expected);
    actNode = parseExpression(actual);
  } catch {
    return false;
  }

  const vars = new Set<string>();
  collectVars(expNode, vars);
  collectVars(actNode, vars);
  const varList = [...vars];

  let valid = 0;
  const TRIALS = 40;
  for (let i = 0; i < TRIALS; i++) {
    const env: Record<string, number> = {};
    for (const v of varList) env[v] = 1.25 + Math.random() * 8.5; // (1.25, 9.75)
    const ve = evalNode(expNode, env);
    const va = evalNode(actNode, env);
    if (!Number.isFinite(ve) || !Number.isFinite(va)) continue;
    valid++;
    if (Math.abs(ve - va) > 1e-6 * (1 + Math.abs(ve))) return false;
  }
  // Require enough clean samples so we don't pass on degenerate all-NaN cases.
  return valid >= Math.max(8, Math.floor(TRIALS / 4));
}
