import { Course } from '@/types/course-types';
import { CourseCard } from '@/components/common/course-card';

interface CourseListProps {
    courses: Course[];
    isLoading: boolean;
    onCourseSelected?: (course: Course) => void;
    onCourseDeleted?: () => void;
}

export const CourseList = ({
    courses,
    isLoading,
    onCourseSelected,
    onCourseDeleted,
}: CourseListProps) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-pulse text-center">
                    <p className="text-lg text-muted-foreground">Carregando cursos...</p>
                </div>
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="text-center py-8 border rounded-lg bg-muted/30">
                <p className="text-lg text-muted-foreground">
                    Você ainda não tem nenhum curso.
                </p>
                <p className="text-muted-foreground">
                    Crie seu primeiro curso usando o botão acima.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    course={course}
                    onSelected={onCourseSelected}
                    onDeleted={onCourseDeleted}
                />
            ))}
        </div>
    );
};
