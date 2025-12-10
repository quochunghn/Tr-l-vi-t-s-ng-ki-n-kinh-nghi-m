import React from 'react';
import { GradeLevel, Subject, LearningTopic } from '../types';
import { BookOpen, Calculator, Ruler, Hash, GraduationCap } from 'lucide-react';

interface TopicMenuProps {
  onSelectTopic: (topic: LearningTopic) => void;
  isOpen: boolean;
  onClose: () => void;
}

// Predefined curriculum topics for Vietnam THCS
const TOPICS: LearningTopic[] = [
  {
    id: 'g6-arithmetic-sets',
    grade: GradeLevel.Grade6,
    subject: Subject.Arithmetic,
    title: 'Tập hợp & Số tự nhiên',
    promptContext: 'Hãy giúp tôi ôn tập về Tập hợp và các phép toán trên tập hợp số tự nhiên (Lớp 6).'
  },
  {
    id: 'g6-arithmetic-integers',
    grade: GradeLevel.Grade6,
    subject: Subject.Arithmetic,
    title: 'Số nguyên',
    promptContext: 'Hãy giúp tôi học về Số nguyên, quy tắc dấu và các phép toán cộng trừ nhân chia số nguyên (Lớp 6).'
  },
  {
    id: 'g6-geometry-basic',
    grade: GradeLevel.Grade6,
    subject: Subject.Geometry,
    title: 'Hình học trực quan',
    promptContext: 'Hãy giảng cho tôi về Điểm, Đường thẳng, Đoạn thẳng và Tia (Hình học Lớp 6).'
  },
  {
    id: 'g7-algebra-rational',
    grade: GradeLevel.Grade7,
    subject: Subject.Algebra,
    title: 'Số hữu tỉ',
    promptContext: 'Tôi muốn học về Số hữu tỉ và các phép toán cộng, trừ, nhân, chia số hữu tỉ (Lớp 7).'
  },
  {
    id: 'g7-geometry-triangles',
    grade: GradeLevel.Grade7,
    subject: Subject.Geometry,
    title: 'Tam giác bằng nhau',
    promptContext: 'Hãy giải thích về các trường hợp bằng nhau của tam giác (c.c.c, c.g.c, g.c.g) (Lớp 7).'
  },
  {
    id: 'g8-algebra-polynomials',
    grade: GradeLevel.Grade8,
    subject: Subject.Algebra,
    title: 'Đa thức & Hằng đẳng thức',
    promptContext: 'Hãy dạy tôi về Đa thức và 7 hằng đẳng thức đáng nhớ (Lớp 8).'
  },
  {
    id: 'g8-geometry-quadrilaterals',
    grade: GradeLevel.Grade8,
    subject: Subject.Geometry,
    title: 'Tứ giác',
    promptContext: 'Tôi muốn tìm hiểu về các loại Tứ giác: Hình thang, Hình bình hành, Hình chữ nhật, Hình thoi, Hình vuông (Lớp 8).'
  },
  {
    id: 'g9-algebra-equations',
    grade: GradeLevel.Grade9,
    subject: Subject.Algebra,
    title: 'Phương trình bậc hai',
    promptContext: 'Hãy hướng dẫn tôi cách giải Phương trình bậc hai một ẩn và hệ thức Vi-ét (Lớp 9).'
  },
  {
    id: 'g9-geometry-circles',
    grade: GradeLevel.Grade9,
    subject: Subject.Geometry,
    title: 'Đường tròn',
    promptContext: 'Hãy giảng về Đường tròn, góc ở tâm, góc nội tiếp và các tính chất liên quan (Lớp 9).'
  },
];

const TopicMenu: React.FC<TopicMenuProps> = ({ onSelectTopic, isOpen, onClose }) => {
  const groupedTopics = TOPICS.reduce((acc, topic) => {
    if (!acc[topic.grade]) {
      acc[topic.grade] = [];
    }
    acc[topic.grade].push(topic);
    return acc;
  }, {} as Record<GradeLevel, LearningTopic[]>);

  const getIcon = (subject: Subject) => {
    switch (subject) {
      case Subject.Algebra: return <Calculator size={16} />;
      case Subject.Geometry: return <Ruler size={16} />;
      case Subject.Arithmetic: return <Hash size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 w-72 bg-white border-r border-teal-100 flex flex-col shadow-lg md:shadow-none`}>
      <div className="p-6 border-b border-teal-100 bg-teal-50">
        <div className="flex items-center gap-2 text-teal-800 font-bold text-xl">
          <GraduationCap size={28} />
          <span>MathGenius</span>
        </div>
        <p className="text-sm text-teal-600 mt-1">Gia sư toán THCS của bạn</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {(Object.keys(groupedTopics) as GradeLevel[]).map((grade) => (
          <div key={grade}>
            <h3 className="text-xs font-bold text-teal-500 uppercase tracking-wider mb-3 ml-2">{grade}</h3>
            <div className="space-y-1">
              {groupedTopics[grade].map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    onSelectTopic(topic);
                    if (window.innerWidth < 768) onClose();
                  }}
                  className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-700 transition-colors group"
                >
                  <span className="text-gray-400 group-hover:text-teal-500 transition-colors">
                    {getIcon(topic.subject)}
                  </span>
                  {topic.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-teal-100 bg-gray-50 text-xs text-gray-500 text-center">
        Powered by Gemini 3 Pro
      </div>
    </div>
  );
};

export default TopicMenu;