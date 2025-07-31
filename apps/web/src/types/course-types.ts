export interface Course {
  id: number;
  title: string;
  ownerId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseRequest {
  title: string;
}

export interface UpdateCourseRequest {
  title: string;
}

export interface CourseResponse {
  id: number;
  title: string;
  ownerId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
