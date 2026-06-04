export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index pilihan (0-3)
}

export interface QuizCategory {
  id: string;
  categoryName: string;
  questions: QuizQuestion[];
}

export function getQuizForCategory(categoryName: string, questionCount: number = 20): QuizCategory {
  const normalizedCategory = categoryName.toLowerCase().trim();
  const safeId = normalizedCategory.replace(/[^a-z0-9]/g, '-');

  // Generate dummy questions for testing/demo purposes
  const dummyQuestions: QuizQuestion[] = [];

  for (let i = 1; i <= questionCount; i++) {
    // Pola jawaban benar dirotasi agar tidak selalu di A
    const correctIdx = i % 4;

    // Susun opsi jawaban
    const options = ["Jawaban Salah", "Jawaban Salah", "Jawaban Salah", "Jawaban Salah"];
    options[correctIdx] = "Jawaban Benar";

    dummyQuestions.push({
      id: i,
      text: `Pertanyaan ${i} untuk evaluasi ${categoryName}. Manakah jawaban yang benar?`,
      options: options,
      correctAnswer: correctIdx
    });
  }

  return {
    id: `quiz-${safeId}`,
    categoryName: categoryName,
    questions: dummyQuestions
  };
}
