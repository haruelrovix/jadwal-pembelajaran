import { useEffect, useState } from 'react';
import { Users, Search, BookOpen, School, FileSpreadsheet, Calendar } from 'lucide-react';
import { Teacher, Course, ClassRoom, ApiResponse, Schedule } from './types';
import TeacherTable from './components/TeacherTable';
import CourseTable from './components/CourseTable';
import ClassroomTable from './components/ClassroomTable';
import ScheduleTable from './components/ScheduleTable';

type Tab = 'teachers' | 'courses' | 'classrooms' | 'schedules';

function App() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [classrooms, setClassrooms] = useState<ClassRoom[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('teachers');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/jadwal-pembelajaran.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: ApiResponse = await response.json();
        setTeachers(data.teachers);
        setCourses((data.subjects || []).sort((a, b) => a.short.localeCompare(b.short)));
        setClassrooms(data.classRooms || []);
        setSchedules(data.schedules || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg mb-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileSpreadsheet className="h-8 w-8 text-blue-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Learning Schedule</h1>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('teachers')}
                className={`${activeTab === 'teachers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Users className="h-5 w-5 mr-2" />
                Teachers
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`${activeTab === 'courses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Courses
              </button>
              <button
                onClick={() => setActiveTab('classrooms')}
                className={`${activeTab === 'classrooms'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <School className="h-5 w-5 mr-2" />
                Classrooms
              </button>
              <button
                onClick={() => setActiveTab('schedules')}
                className={`${activeTab === 'schedules'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedules
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {getActiveTabContent(activeTab, teachers, courses, classrooms, schedules, searchQuery)}
      </div>
    </div>
  );
}

function getActiveTabContent(
  activeTab: Tab,
  teachers: Teacher[],
  courses: Course[],
  classrooms: ClassRoom[],
  schedules: Schedule[],
  searchQuery: string
) {
  switch (activeTab) {
    case 'teachers':
      return <TeacherTable teachers={teachers} searchQuery={searchQuery} />;
    case 'courses':
      return <CourseTable courses={courses} searchQuery={searchQuery} />;
    case 'classrooms':
      return <ClassroomTable classrooms={classrooms} searchQuery={searchQuery} />;
    case 'schedules':
      return <ScheduleTable schedules={schedules} searchQuery={searchQuery} />;
    default:
      return null;
  }
}

export default App;
