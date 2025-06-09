// src/components/custom/BoardRules.tsx
"use client";

export default function BoardRules() {
  return (
    <div className="bg-rules-background p-3 md:p-4 my-2 border border-rules-border">
      <h3 className="text-sm font-headline font-bold text-rules-text">
        <span className="text-green-600 font-bold">Admin</span> <span className="text-gray-600 text-xs">06/19/2025 23:59:21</span> <span className="text-red-600 font-bold">[STICKY]</span>
      </h3>
      <h4 className="text-sm font-bold text-rules-text mt-1">
        【IMPORTANT】Board Rules - Please Read【新規の方へ】
      </h4>
      <div className="text-xs text-rules-text mt-2 space-y-0.5">
        <p>Welcome to our anonymous board! Please follow these rules:</p>
        <ol className="list-decimal list-inside ml-2">
          <li>Be respectful to other users</li>
          <li>No spam or flooding</li>
          <li>No illegal content</li>
          <li>No doxxing or personal information</li>
          <li>Keep it fun and interesting!</li>
        </ol>
        <p className="mt-1">This is a simple threadboard where everyone can post and discuss. Enjoy your stay! (´・ω・｀)</p>
        <p className="mt-1">
          <a href="#" className="text-blue-600 underline">[Reply]</a>
        </p>
      </div>
    </div>
  );
}
