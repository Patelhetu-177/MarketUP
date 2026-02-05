import Header from "@/components/Header";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen text-gray-400">
      <Header user={user} />

      <div className="container py-10">{children}</div>
    </main>
  );
};

export default layout;
