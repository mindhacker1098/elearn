import { notify } from '@/components/Helpers/toaster';
import { Course, Coursewithid } from '../types/Course';
import axios from 'axios';
import { create } from 'zustand';

interface CourseStoreState {
  course: Course[] | null;
  setCourse: () => Promise<void>; // Indicate this function is async
}

interface CourseIdStoreState {
  coursename: Coursewithid[]; // Change to an array of Coursewithid
  setCourseName: () => Promise<void>; // Indicate this function is async
}

interface CurrentCourseState {
  course: Course | null;
  updateCourse: (id: string) => Promise<void>; // Indicate this function is async
}

interface CurrentSrcState {
  srclist: string[] | null;
  updateSrcList: (id: string) => Promise<void>; // Indicate this function is async
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
  coursename: [], // Initialize as an empty array
  setCourseName: async () => {
    const response = await axios.get('/api/courseapi/getallcoursename');
    const data: Coursewithid[] = response.data; // Ensure the data type matches
    set({ coursename: data });
  },
}));

export const useCurrentCourseStore = create<CurrentCourseState>((set) => ({
  course: null,
  updateCourse: async (id) => {
    try {
      const response = await axios.get(`/api/courseapi/getcoursebyid/${id}`);
      const data = response.data;
      set({ course: data });
    } catch (err) {
      console.log(err);
      notify("error", "Error fetching course");
    }
  },
}));

export const useCurrentSrcStore = create<CurrentSrcState>((set) => ({
  srclist: null,
  updateSrcList: async (id) => {
    try {
      const response = await axios.get(`/api/courseapi/getcoursesrcbyid/${id}`);
      const data = response.data;
      set({ srclist: data });
    } catch (err) {
      console.log(err);
    }
  },
}));
