import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ChapterContent from '@/components/ChapterContent';
import { chapters } from '@/lib/chapters';

export async function generateStaticParams() {
  return chapters.map((ch) => ({ id: ch.id }));
}

export default async function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chapter = chapters.find((ch) => ch.id === id);
  
  if (!chapter) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar currentChapterId={chapter.id} />
        <main className="flex-1 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ChapterContent chapter={chapter} />
          </div>
        </main>
      </div>
    </>
  );
}
