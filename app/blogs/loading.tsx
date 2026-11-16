const Loading = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center gap-3 p-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-base-content/70 font-medium">Loading </p>
    </div>
  );
};

export default Loading;
