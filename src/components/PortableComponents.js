export const portableComponents = {
    types: {
      image: ({ value }) => (
        <img
          src={value.asset?.url}
          alt={value.alt || ""}
          className="my-6 rounded-lg"
        />
      ),
    },
  
    block: {
      h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
      h2: ({ children }) => <h2 className="text-3xl font-semibold my-4">{children}</h2>,
      h3: ({ children }) => <h3 className="text-2xl font-semibold my-3">{children}</h3>,
      normal: ({ children }) => <p className="text-lg leading-relaxed my-2">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 pl-4 italic my-4">{children}</blockquote>
      ),
    },
  
    list: {
      bullet: ({ children }) => <ul className="list-disc ml-6 my-3">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal ml-6 my-3">{children}</ol>,
    },
  
    listItem: {
      bullet: ({ children }) => <li className="my-1">{children}</li>,
      number: ({ children }) => <li className="my-1">{children}</li>,
    },
  };
  