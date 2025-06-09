
"use client";

import Link from 'next/link';

export default function AppHeader() {
  const newMarqueeText = "💰💰💰 赚钱机会！每天¥10,000! 点击这里! 💯保证赚钱! 免费注册! VIP会员特惠! 立即点击! 限时优惠!";
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

      {/* Bottom Announcement Bar - Updated Marquee */}
      <div className="bg-announcement-bar-background text-announcement-bar-text py-1 px-2 border-b-2 border-black flex items-center overflow-hidden">
        <span className="text-yellow-300 shrink-0">★★★</span>
        {/* The marquee viewport (ad-marquee equivalent) */}
        <div className="flex-1 mx-2 overflow-hidden">
          {/* The scrolling content (marquee-content equivalent) */}
          <div className="animate-marquee whitespace-nowrap">
            <span className="px-2 inline-block">
              {newMarqueeText}
            </span>
            <span className="px-2 inline-block"> {/* Duplicated content for seamless scroll */}
              {newMarqueeText}
            </span>
          </div>
        </div>
        <span className="text-yellow-300 shrink-0">★★★</span>
      </div>
    </header>
  );
}
