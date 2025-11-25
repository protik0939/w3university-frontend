export interface CertificateData {
  id: string
  studentName: string
  courseName: string
  completionDate: string
  certificateNumber: string
  issueDate: string
  grade?: string
  instructor?: string
  design: 'modern' | 'classic' | 'minimal' | 'elegant'
}

export const certificatesData: CertificateData[] = [
  {
    id: '1',
    studentName: 'Sarah Johnson',
    courseName: 'Complete Web Development Bootcamp',
    completionDate: 'November 15, 2024',
    certificateNumber: 'W3U-2024-WD-001234',
    issueDate: '2024-11-15',
    grade: 'A+ Excellent',
    instructor: 'Dr. Michael Chen',
    design: 'modern'
  },
  {
    id: '2',
    studentName: 'Alex Rodriguez',
    courseName: 'Advanced JavaScript & ES6+',
    completionDate: 'October 28, 2024',
    certificateNumber: 'W3U-2024-JS-005678',
    issueDate: '2024-10-28',
    grade: 'Distinction',
    instructor: 'Prof. Emily Watson',
    design: 'classic'
  },
  {
    id: '3',
    studentName: 'Priya Patel',
    courseName: 'Python Programming Fundamentals',
    completionDate: 'November 20, 2024',
    certificateNumber: 'W3U-2024-PY-009012',
    issueDate: '2024-11-20',
    grade: 'A Grade',
    instructor: 'Dr. James Kumar',
    design: 'minimal'
  },
  {
    id: '4',
    studentName: 'Marcus Thompson',
    courseName: 'React & Modern Frontend Development',
    completionDate: 'November 5, 2024',
    certificateNumber: 'W3U-2024-RC-003456',
    issueDate: '2024-11-05',
    grade: 'Outstanding',
    instructor: 'Sarah Mitchell',
    design: 'elegant'
  },
  {
    id: '5',
    studentName: 'Li Wei',
    courseName: 'Full Stack Development with Node.js',
    completionDate: 'September 18, 2024',
    certificateNumber: 'W3U-2024-FS-007890',
    issueDate: '2024-09-18',
    grade: 'A+ Excellent',
    instructor: 'Dr. Robert Chang',
    design: 'modern'
  },
  {
    id: '6',
    studentName: 'Emma Williams',
    courseName: 'CSS & Responsive Design Mastery',
    completionDate: 'November 12, 2024',
    certificateNumber: 'W3U-2024-CS-001122',
    issueDate: '2024-11-12',
    grade: 'Distinction',
    instructor: 'Lisa Anderson',
    design: 'classic'
  },
  {
    id: '7',
    studentName: 'Ahmed Hassan',
    courseName: 'Database Design & SQL',
    completionDate: 'October 30, 2024',
    certificateNumber: 'W3U-2024-DB-004567',
    issueDate: '2024-10-30',
    grade: 'A Grade',
    instructor: 'Prof. David Martinez',
    design: 'minimal'
  },
  {
    id: '8',
    studentName: 'Sofia Martinez',
    courseName: 'UI/UX Design Principles',
    completionDate: 'November 8, 2024',
    certificateNumber: 'W3U-2024-UX-008901',
    issueDate: '2024-11-08',
    grade: 'Outstanding',
    instructor: 'Jennifer Lee',
    design: 'elegant'
  },
  {
    id: '9',
    studentName: 'Ryan O\'Connor',
    courseName: 'TypeScript for Developers',
    completionDate: 'November 22, 2024',
    certificateNumber: 'W3U-2024-TS-002345',
    issueDate: '2024-11-22',
    grade: 'A+ Excellent',
    instructor: 'Dr. Kevin Park',
    design: 'modern'
  }
]
