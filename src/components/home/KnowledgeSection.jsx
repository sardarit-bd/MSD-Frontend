"use client";

import { Play } from "lucide-react";

export default function KnowledgeSection() {
  return (
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
              <span className="text-sm text-gray-600 cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className="bg-white shadow-sm">
              <div className="relative h-[200px] bg-gray-200 flex items-center justify-center">
                <Play size={40} className="text-blue-600" />
              </div>

              <div className="border-t-4 border-[#1e5c75] p-4">
                <p className="font-semibold text-gray-800">
                  Overview of Hydration
                </p>
              </div>
            </div>
          </div>

          {/* 3D MODEL CARD */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold tracking-widest text-gray-700">
                3D MODEL
              </h3>
              <span className="text-sm text-gray-600 cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className="bg-white shadow-sm">
              <div className="relative h-[200px] bg-gray-300"></div>

              <div className="border-t-4 border-[#1e5c75] p-4">
                <p className="font-semibold text-gray-800">
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
              <span className="text-sm text-gray-600 cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className="bg-white shadow-sm p-6 border">
              <h4 className="font-semibold text-gray-800 mb-3">
                Cataract
              </h4>

              <p className="text-sm text-gray-600 mb-4">
                Which of the following risk factors is common to almost all patients with cataracts?
              </p>

              <div className="space-y-2 text-sm text-gray-700">
                <label className="flex gap-2">
                  <input type="radio" name="quiz" />
                  A. Uveitis
                </label>
                <label className="flex gap-2">
                  <input type="radio" name="quiz" />
                  B. Older age
                </label>
                <label className="flex gap-2">
                  <input type="radio" name="quiz" />
                  C. Trauma
                </label>
                <label className="flex gap-2">
                  <input type="radio" name="quiz" />
                  D. Alcohol use
                </label>
              </div>

              <button className="mt-6 w-full bg-[#1e5c75] text-white py-3 text-sm font-semibold hover:bg-[#174a5d] transition">
                AM I CORRECT?
              </button>
            </div>
          </div>

          {/* PEARL OF THE DAY */}
          <div>
            <h3 className="text-sm font-bold tracking-widest text-gray-700 mb-2">
              PEARL OF THE DAY
            </h3>

            <div className="bg-white shadow-sm p-6 border">
              <h4 className="font-semibold text-gray-800 mb-3">
                Acute Bronchitis
              </h4>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Acute cough in patients with asthma, COPD, bronchiectasis,
                or cystic fibrosis should typically be considered an
                exacerbation of that disorder rather than simple acute bronchitis.
              </p>

              <button className="w-full bg-[#1e5c75] text-white py-3 text-sm font-semibold hover:bg-[#174a5d] transition">
                READ ALL
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}