import { notify } from '@/components/Helpers/toaster';
import { Course, Coursewithid } from '../types/Course';
import axios from 'axios';
import { create } from 'zustand'
interface CourseStoreState {
  course: Course[] | null;
  setCourse: () => void;
}
interface CourseIdStoreState {
  coursename: Coursewithid | null;
  setCourseName: () => void;
}
interface CurrentCourseState {
  course: Course | null;
  updateCourse: (id:string) => void;
}
interface CurrentSrcState {
  srclist:string[] | null;
  updateSrcList: (id:string) => void;
}

export const useCourseStore = create<CourseStoreState>((set) => ({
    course: null,
    setCourse: async () => {
        const response = await axios.get('/api/courseapi/getallcourse');
        const data = response.data;
        set({ course: data });
    },
}));
export const useCourseIdStore = create<CourseIdStoreState>((set) => ({
    coursename: null,
    setCourseName: async () => {
        const response = await axios.get('/api/courseapi/getallcoursename');
        const data = response.data;
        set({ coursename: data });
    },
}));
export const useCurrentCourseStore = create<CurrentCourseState>((set) => ({
    course: null,
    updateCourse: async (id) => {
      try{
        const response = await axios.get(`/api/courseapi/getcoursebyid/${id}`);
        const data = response.data;
        set({ course: data });
      }
        catch(err){
          console.log(err);
          notify("error", "Error fetching course");
        }
       
    },
}));
export const useCurrentSrcStore = create<CurrentSrcState>((set) => ({
    srclist: null,
    updateSrcList: async (id) => {
      try{
        const response = await axios.get(`/api/courseapi/getcoursesrcbyid/${id}`);
        const data = response.data;
        set({ srclist: data });
      }
        catch(err){
          console.log(err);
        }
       
    },
}));
