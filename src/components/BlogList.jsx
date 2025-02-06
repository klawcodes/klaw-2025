export default function BlogList() {
  const blogs = [
    { title: "First Blog Post", date: "2024-02-01" },
    { title: "Second Blog Post", date: "2024-02-05" },
    { title: "Third Blog Post", date: "2024-02-10" },
  ];

  return (
    <div className="h-full">
      <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
      <div className="space-y-1 text-xs">
        {blogs.map((blog, index) => (
          <div key={index} className="p-4 border rounded hover:bg-gray-50">
            <h3 className="font-medium">{blog.title}</h3>
            <p className="text-sm text-gray-500">{blog.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}