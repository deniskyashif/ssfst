declare module 'ssfst' {

  export class SSFST {

    constructor(dict: Array<{input: string, output: string}>);

    process: (word: string) => string;

    stateCount: () => number;

    transitionCount: () => number;
  }

}
