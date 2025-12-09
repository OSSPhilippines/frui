//--------------------------------------------------------------------//
// Imports

//modules
import type { CSSProperties } from 'react';
//frui
import type { Hash } from '../../types.js';

//--------------------------------------------------------------------//
// Types

export type ClassStyleOptions = {
  classes?: string[], 
  styles?: CSSProperties
};

//--------------------------------------------------------------------//
// Classes

export abstract class PropTool<P extends Hash, K extends Hash> {
  //names of special props
  protected _keys: string[];
  //arbitrary props
  protected _props: P;

  /**
   * Returns all special keys found in props
   */
  public get active() {
    return this._keys.filter(
      key => typeof this._props[key] !== 'undefined'
    );
  }

  /**
   * Returns attributes excluding color props
   */
  public get attributes() {
    //make a copy of props
    const props = { ...this._props };
    //remove each key from props
    this._keys.forEach(key => delete props[key]);
    return props as Omit<P, keyof K>;
  }

  /**
   * Returns color props only
   */
  public get config() {
    //use keys to extract color props
    const entries = this._keys.map(key => {
      return [ key, this._props[key] ];
    });
    //return a subset of P with only keys in ColorProps
    return Object.fromEntries(entries) as K;
  }

  /**
   * Returns the first special key found in props
   */
  public get key() {
    return this._keys.find(key => Boolean(this._props[key]));
  }

  /**
   * Returns all special keys (readonly)
   */
  public get keys() {
    return [ ...this._keys ];
  }

  /**
   * Returns all props (readonly)
   */
  public get props() {
    return { ...this._props };
  }

  /**
   * Returns the value of the first special key found in props
   */
  public get value() {
    const key = this.key;
    return key ? this._props[key] : undefined;
  }

  /**
   * Register props and special keys
   */
  public constructor(props: P, keys: string[]) {
    this._keys = keys;
    this._props = props;
  }

  /**
   * Get class styles for text align prop
   */
  public abstract getClassStyles(
    options?: ClassStyleOptions
  ): { classes: string[], styles: CSSProperties };
};

export default PropTool;