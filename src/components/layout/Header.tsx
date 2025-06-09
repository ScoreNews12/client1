
"use client";

import Link from 'next/link';

export default function AppHeader() {
  return (
    <header className="w-full text-xs">
      {/* Top Title Bar */}
      <div className="bg-header-title-background text-center py-2 border-b border-gray-400">
        <h1 className="text-3xl font-headline font-bold text-header-title-text">
          <Link href="/">ヽ(´▽｀)ノ 匿名掲示板へようこそ！ ヽ(´▽｀)ノ</Link>
        </h1>
        <p className="text-header-subtitle-text text-sm">
          ～最強の掲示板サイト～ EXTREME TEXTBOARD EXPERIENCE
        </p>
      </div>

      {/* Middle Info Bar (Static content based on image) */}
      <div className="bg-info-bar-background text-info-bar-text py-1 px-2 border-b border-gray-500 flex justify-between items-center text-[10px] md:text-xs">
        <div>
          <span>Your IP: 140.13.87.100</span> | <span>Browser: Chrome</span> | <span>Local: ▲ 21.6°C</span> 
        </div>
        <div className="hidden md:block">
          <span>Tokyo: ▼ 21.6°C</span> | <span>New York: ▲ 19.4°C</span> | <span>London: ▲ 14.0°C</span> | <span>Sydney: ▼ 24.1°C</span>
        </div>
      </div>
      <div className="bg-info-bar-background text-info-bar-text py-1 px-2 border-b border-gray-500 text-[10px] md:text-xs">
        <span>現在のレス投稿数：187件 本日の投稿数：187件</span>
      </div>

      {/* Bottom Announcement Bar - Now with scrolling */}
      <div className="bg-announcement-bar-background text-announcement-bar-text py-1 px-2 border-b-2 border-black flex items-center overflow-hidden">
        <span className="text-yellow-300 shrink-0">★★★</span>
        {/* The marquee container */}
        <div className="flex-1 mx-2 overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee">
            {/* Repeated text for seamless scrolling */}
            <span className="px-2">
              継続寄付のお願い！毎月¥10,000が点灯決定！保証回数UP！先着注意！VIP会員特典！立候補点灯！規制低減！
            </span>
            <span className="px-2">
              継続寄付のお願い！毎月¥10,000が点灯決定！保証回数UP！先着注意！VIP会員特典！立候補点灯！規制低減！
            </span>
          </div>
        </div>
        <span className="text-yellow-300 shrink-0">★★★</span>
      </div>
    </header>
  );
}
