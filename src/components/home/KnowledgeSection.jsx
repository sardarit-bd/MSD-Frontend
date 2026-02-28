"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import Image from "next/image";

export default function KnowledgeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  // মডাল ওপেন ফাংশন
  const openModal = (title, message = "We're working hard to bring you this feature. Stay tuned for updates!") => {
    setModalContent({ title, message });
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // মডাল ক্লোজ ফাংশন
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({ title: "", message: "" });
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className="bg-[#f3f3f3] py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-8">

          {/* LEFT SIDE (Video + 3D Model) */}
          <div className="col-span-2 grid grid-cols-2 gap-6">

            {/* VIDEO CARD */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold tracking-widest text-gray-700">
                  VIDEO
                </h3>
                <span
                  onClick={() => openModal("All Videos")}
                  className="text-sm text-gray-600 cursor-pointer hover:underline hover:text-[#1e5c75] transition"
                >
                  View All
                </span>
              </div>

              <div
                onClick={() => openModal("Video Player", "Video player is coming soon!")}
                className="bg-white shadow-sm cursor-pointer hover:shadow-lg transition group"
              >
                <div className="relative h-[200px] bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition">
                  <Play size={40} className="text-blue-600 group-hover:scale-110 transition" />
                </div>

                <div className="border-t-4 border-[#1e5c75] p-4 group-hover:border-[#0F3549] transition">
                  <p className="font-semibold text-gray-800 group-hover:text-[#1e5c75] transition">
                    Overview of Hydration
                  </p>
                </div>
              </div>
            </div>

            {/* 3D MODEL CARD */}
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold tracking-widest text-gray-700">
                  3D MODEL
                </h3>
                <span
                  onClick={() => openModal("All 3D Models")}
                  className="text-sm text-gray-600 cursor-pointer hover:underline hover:text-[#1e5c75] transition"
                >
                  View All
                </span>
              </div>

              {/* Card */}
              <div
                onClick={() =>
                  openModal("3D Model Viewer", "3D model viewer is coming soon!")
                }
                className="bg-white shadow-sm cursor-pointer hover:shadow-lg transition duration-300 group rounded-lg overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src="/eye-model.jpg"   // 👉 image public folder e rakhba
                    alt="Eye 3D Model"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="border-t-4 border-[#1e5c75] p-4 group-hover:border-[#0F3549] transition duration-300">
                  <p className="font-semibold text-gray-800 group-hover:text-[#1e5c75] transition">
                    Eye: Anterior and Posterior Chambers
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE (Test + Pearl) */}
          <div className="space-y-8">

            {/* TEST YOUR KNOWLEDGE */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold tracking-widest text-gray-700">
                  TEST YOUR KNOWLEDGE
                </h3>
                <span
                  onClick={() => openModal("All Quizzes")}
                  className="text-sm text-gray-600 cursor-pointer hover:underline hover:text-[#1e5c75] transition"
                >
                  View All
                </span>
              </div>

              <div className="bg-white shadow-sm p-6 border cursor-pointer hover:shadow-lg transition group">
                <h4 className="font-semibold text-gray-800 mb-3 group-hover:text-[#1e5c75] transition">
                  Cataract
                </h4>

                <p className="text-sm text-gray-600 mb-4">
                  Which of the following risk factors is common to almost all patients with cataracts?
                </p>

                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex gap-2 items-center cursor-pointer">
                    <input type="radio" name="quiz" className="cursor-pointer" />
                    A. Uveitis
                  </label>
                  <label className="flex gap-2 items-center cursor-pointer">
                    <input type="radio" name="quiz" className="cursor-pointer" />
                    B. Older age
                  </label>
                  <label className="flex gap-2 items-center cursor-pointer">
                    <input type="radio" name="quiz" className="cursor-pointer" />
                    C. Trauma
                  </label>
                  <label className="flex gap-2 items-center cursor-pointer">
                    <input type="radio" name="quiz" className="cursor-pointer" />
                    D. Alcohol use
                  </label>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal("Quiz Result", "Quiz feature is coming soon!");
                  }}
                  className="mt-6 w-full bg-[#1e5c75] text-white py-3 text-sm font-semibold hover:bg-[#174a5d] transition cursor-pointer"
                >
                  AM I CORRECT?
                </button>
              </div>
            </div>

            {/* PEARL OF THE DAY */}
            <div>
              <h3 className="text-sm font-bold tracking-widest text-gray-700 mb-2">
                PEARL OF THE DAY
              </h3>

              <div
                onClick={() => openModal("Pearl of the Day", "Daily medical pearls coming soon!")}
                className="bg-white shadow-sm p-6 border cursor-pointer hover:shadow-lg transition group"
              >
                <h4 className="font-semibold text-gray-800 mb-3 group-hover:text-[#1e5c75] transition">
                  Acute Bronchitis
                </h4>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Acute cough in patients with asthma, COPD, bronchiectasis,
                  or cystic fibrosis should typically be considered an
                  exacerbation of that disorder rather than simple acute bronchitis.
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal("Acute Bronchitis", "Full article is coming soon!");
                  }}
                  className="w-full bg-[#1e5c75] text-white py-3 text-sm font-semibold hover:bg-[#174a5d] transition cursor-pointer"
                >
                  READ ALL
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Coming Soon Modal */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#1e5c75]">
                  {modalContent.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-1 hover:bg-gray-100 rounded-full transition cursor-pointer"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="text-center py-8">
                <div className="mb-4">
                  <svg
                    className="w-20 h-20 mx-auto text-[#1e5c75]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">
                  Coming Soon!
                </h4>
                <p className="text-gray-600">
                  {modalContent.message}
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-[#1e5c75] text-white rounded hover:bg-[#0F3549] transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}