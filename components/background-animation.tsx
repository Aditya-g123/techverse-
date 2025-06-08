"use client"

import { DotLottieReact } from "@lottiefiles/dotlottie-react"

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
      <DotLottieReact
        src="https://lottie.host/ce6b924a-da2b-469f-9ea5-6acf563e6a9c/lPUwpjxGDx.lottie"
        loop
        autoplay
        className="w-full h-full object-cover"
      />
    </div>
  )
}
