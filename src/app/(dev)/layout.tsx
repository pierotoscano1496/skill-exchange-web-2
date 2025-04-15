const DevLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-12">
      {children}
    </main>
  );
};

DevLayout.displayName = "DevLayout";

export default DevLayout;
