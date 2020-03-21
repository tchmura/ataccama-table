export type Data = {
  [key: string]: string;
};

export type Kids = {
  [key: string]: {
    records: Item[];
  };
};

export type Item = {
  data: Data;
  kids: Kids | {};
};
