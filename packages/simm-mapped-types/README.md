# Simple Mapped types

## Features

- [ ] PartialType: returns a type (class) with all the properties of the input type set to optional
- [ ] PickType: constructs a new type (class) by picking a set of properties from an input type
- [ ] OmitType: constructs a type by picking all properties from an input type and then removing a particular set of keys
- [ ] IntersectionType: combines two types into one new type (class)

## Examples

```typescript
type Cat = {
  id: number;
  name: string;
  age: number;
};

type BehaviorCat = {
  jump: () => void;
};

type CatWithPartialType = PartialType<Cat>;

const myCat: CatWithPartialType = { id: 1 };

type CatWithPickType = PickType<Cat, "id", "name">;

const myCat: CatWithPickType = { id: 1, name: "cat" };

type CatWithOmitType = OmitType<Cat, "id">;

const myCat: CatWithOmitType = { name: "cat", age: 5 };

type CatWithIntersectionType = IntersectionType<Cat, BehaviorCat>;

const myCat: CatWithIntersectionType = {
  id: 1,
  name: "cat",
  age: 5,
  jump: () => {},
};
```

## Install

Install package:

```sh
# using yarn
yarn add [your-library]

# using npm
npm install [your-library]

# using pnpm
pnpm install [your-library]
```

> Note:

## Usage

Guideline setup, usage, ...
