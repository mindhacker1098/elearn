import { notify } from '@/components/Helpers/toaster';
import { Course, Coursewithid } from '../types/Course';
import axios from 'axios';
import { create } from 'zustand'
import { Question } from '../types/Question';
interface TestStore {
    questions: Question[] | null;
    setQuestions: (id:string,no:string) => void;
  }
  export const useCurrentTestStore = create<TestStore>((set) => ({
    questions: null,
    setQuestions: async (id,no) => {
      try{
        const response = await axios.get(`/api/testapi/getquestionsbyid/${id}/${no}`);
        const data = response.data;
        set({ questions: data });
      }
        catch(err){
          console.log(err);
          notify("error", "Error fetching course");
        }
       
    },
}));  