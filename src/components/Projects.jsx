export default function Projects() {
  const projects = [
    { title: "Republik Rempah", tech: "Laravel, Livewire" },
    { title: "DonasiKita", tech: "CodeIgniter" },
    { title: "Awas Imsak!", tech: "Next JS, React, Node.js" },
    { title: "Capres Facts", tech: "HTML, JavaSript, Vanilla CSS" },
  ];

  return (
    <div className="h-full">
      <h2 className="text-xl font-bold mb-4">Featured Works</h2>
      <div className="grid gap-1 text-sm">
        {projects.map((project, index) => (
          <div key={index} className="px-4 py-1 border rounded hover:bg-gray-50">
            <h3 className="font-medium">{project.title}</h3>
            <p className="text-xs text-gray-500">{project.tech}</p>
          </div>
        ))}
      </div>
    </div>
  );
}