type Props = {
  progress: number;
};

export default function Loader({ progress }: Props) {
  const percentage = Math.round(progress * 100);

  if (percentage === 100) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Loading...</h1>
      <div className="w-[400px] h-4 bg-gray-700">
        <div
          className="h-full bg-gray-200 transition-all duration-150 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-4 text-xl text-gray-300">{percentage}%</p>
    </div>
  );
}
