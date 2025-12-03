//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactNode } from 'react';

//frui
import type { ChildrenProps, ReactType } from './types.js';
import toChildrenArray from './helpers/toChildrenArray.js';
export type WhenProps = { condition: boolean };

//--------------------------------------------------------------------//
// Helpers

/**
 * Find next OrWhen or Otherwise child index
 */
export function nextCondition(children: ReactNode[], start = 0) {
  for (let i = start; i < children.length; i++) {
    const child = children[i];
    //if When or Otherwise, return index
    if (child 
      && typeof child === 'object' 
      && 'type' in child
      && (
        child.type === When 
        || child.type === Otherwise
      )
    ) {
      return i;
    }
  }
  return -1;
};

//--------------------------------------------------------------------//
// Components

/**
 * Otherwise component; This is just a flag
 */
export function Otherwise(props: ChildrenProps) {
  return props.children;
};

/**
 * When component; Renders children based on condition
 */
export function When(props: WhenProps & ChildrenProps) {
  //extract props
  const { condition, children } = props;
  //make sure children is an array
  const childlist = toChildrenArray(children);
  //check if there is another When or Otherwise child
  let nextIndex = nextCondition(childlist, 0);
  //if condition is true
  if (condition) {
    //if there's a next When or Otherwise
    return nextIndex >= 0
      //return children up to next When or Otherwise
      ? childlist.slice(0, nextIndex)
      //if not found, return all children
      : children;
  //condition is false
  //if no next When or Otherwise, return null
  } else if (nextIndex < 0) {
    return null;
  }
  do {
    //remember the next index
    const prevIndex = nextIndex;
    const nextFlag = childlist[nextIndex] as ReactType;
    const otherwise = nextFlag.type === Otherwise;
    const validWhen = nextFlag.type === When
      && 'props' in nextFlag
      && nextFlag.props.condition;
    //if otherwise or valid when
    if (otherwise || validWhen) {
      //if when or otherwise with children
      if (nextFlag.props.children) {
        //return its children
        return nextFlag.props.children as ReactNode;
      }
      //find next When or Otherwise
      nextIndex = nextCondition(childlist, prevIndex + 1);
      //if there's a next When or Otherwise
      return nextIndex >= 0
        //return children up to next When or Otherwise
        ? childlist.slice(prevIndex, nextIndex)
        //if not found, return all children
        : childlist.slice(prevIndex + 1);
    }
    //find next When or Otherwise
    nextIndex = nextCondition(childlist, nextIndex + 1);
  } while (nextIndex >= 0);
  //there's no valid When or Otherwise
  return null;
};

//defaults to when
export default Object.assign(When, { Otherwise, nextCondition });