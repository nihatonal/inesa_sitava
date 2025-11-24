import React from "react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../sanityClient";

const PortableTextRenderer = ({ value }) => {
    const components = {
        /* HEADINGS & PARAGRAPHS */
        block: {
            h1: ({ children }) => (
                <h1 className="text-3xl font-bold mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
                <h2 className="text-2xl font-semibold mb-3">{children}</h2>
            ),
            h3: ({ children }) => (
                <h3 className="text-xl font-semibold mb-2">{children}</h3>
            ),
            normal: ({ children }) => (
                <p className="text-base leading-7 mb-4">{children}</p>
            ),
            blockquote: ({ children }) => (
                <blockquote className="border-l-4 pl-4 italic text-gray-600 my-4">
                    {children}
                </blockquote>
            ),
        },

        /* LINKS */
        marks: {
            link: ({ value, children }) => (
                <a
                    href={value.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                >
                    {children}
                </a>
            ),
        },

        /* CUSTOM OBJECTS */
        types: {
            quoteBlock: ({ value }) => (
                <div className="my-6 p-4 bg-gray-100 rounded-lg border-l-4 border-gray-400">
                    <p className="text-lg italic">❝ {value.quote}</p>
                    {value.author && (
                        <p className="text-sm text-right mt-2">— {value.author}</p>
                    )}
                </div>
            ),

            image: ({ value }) => (
                <figure className="my-6">
                    <img
                        src={urlFor(value).width(1000).quality(90).url()}
                        alt={value.alt || "Blog image"}
                        className="rounded-lg w-full"
                    />
                    {value.caption && (
                        <figcaption className="text-sm text-gray-500 mt-2">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            ),

            code: ({ value }) => (
                <pre className="bg-black text-white p-4 rounded-lg my-6 overflow-x-auto">
                    <code>{value.code}</code>
                </pre>
            ),
        },
    };

    return <PortableText value={value} components={components} />;
};

export default PortableTextRenderer;
