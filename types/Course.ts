export interface Topic {
  fileName: string;
  type: string;
  src: string;
  no: string;
}

export interface SubTopic {
  name: string;
  data: Topic[];
}

export interface Course{
  name: string;
  topics: SubTopic[];
}

export interface Coursewithid {
  _id: string;
  name: string;
}