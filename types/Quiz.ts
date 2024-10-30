
  export interface Question{
    no:number;
    name: string;
    
    options:string[];
    answer:string;
  }
    export interface Quiz{
        
        questions: Question[];
        courseid:string;
    }