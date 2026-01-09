export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white p-8 md:p-12 lg:p-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-[#4F46E5]">
                Т.Цэцэг-Өлзий Оч-Эрдэнэ
              </h1>
              <p className="text-gray-500">Програм хангамжийн хөгжүүлэгч</p>
            </div>

            {/* Summary */}
            <p className="text-sm leading-relaxed text-gray-700">
              Програм хангамжийн салбарт Front-end болон Back-end хөгжүүлэгч-ийн
              чиглэлээр ажиллаж, өөрийн ур чадвараа тасралтгүй хөгжүүлэн
              байгууллагын хөгжилд бодит хувь нэмэр оруулах зорилготой.
            </p>

            {/* Projects Section */}
            <section className="space-y-4">
              <div>
                <h3 className="font-semibold text-base">
                  Full Stack Вэб хөгжүүлэлт
                </h3>

                <p className="text-sm text-gray-700 mt-2">EventLux</p>

                {/* Төслийн товч тайлбар */}
                <h4 className="mt-4 text-sm font-semibold text-indigo-600">
                  Төслийн товч тайлбар
                </h4>
                <p className="text-sm text-gray-700 mt-1">
                  Арга хэмжээний танхим захиалах, хөтлөгч болон уран бүтээлч
                  сонгох, захиалгын явцыг хянах боломжтой fullstack веб
                  платформ.
                </p>

                {/* Миний оролцоо */}
                <h4 className="mt-4 text-sm font-semibold text-indigo-600">
                  Миний оролцоо
                </h4>
                <ul className="space-y-3 text-sm text-gray-700 list-disc pl-5 mt-2">
                  <li>
                    Төслийн багийг ахалж, route бүтэц, authentication болон
                    хөгжүүлэлтийн суурь шийдлийг тодорхойлсон
                  </li>
                  <li>
                    Алдаа засвар, navigation логик сайжруулалт хийж, GitHub
                    merge conflict шийдвэрлэн кодын чанарыг хянасан
                  </li>
                </ul>

                <a
                  href="https://ochko-turshilt-anqw.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline mt-3 inline-block"
                >
                  Төслийг үзэх
                </a>
              </div>
            </section>

            {/* Experience Section */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-[#4F46E5]">
                АЖЛЫН ТУРШЛАГА
              </h2>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-sm text-gray-600">Япон улс</p>
                    <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                      3 жил
                    </span>
                  </div>
                  <h3 className="font-semibold text-base mb-3">
                    Гэрээт ажилтан
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700 list-disc pl-5">
                    <li>3 жилийн хугацаанд гэрээт ажил хийсэн</li>
                    <li>
                      Ажлын хариуцлага, сахилга бат, багаар ажиллах чадварыг
                      бодитоор эзэмшсэн
                    </li>
                    <li>
                      Олон улсын орчинд ажиллаж, харилцааны ур чадвараа
                      сайжруулсан
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Additional Information Section */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-[#4F46E5]">
                НЭМЭЛТ МЭДЭЭЛЭЛ
              </h2>

              <ul className="space-y-3 text-sm text-gray-700 list-disc pl-5">
                <li>Software Engineering чиглэлээр ажиллах сонирхолтой</li>
                <li>Шинэ технологи тасралтгүй суралцах хүсэл эрмэлзэлтэй</li>
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Section */}
            <div className="bg-[#F5F3FF] p-6 rounded-lg space-y-4">
              <h2 className="text-sm font-bold text-[#4F46E5]">ХОЛБОО БАРИХ</h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Улаанбаатар хот</p>
                <p>8870-3020</p>
                <p>tsetsegulziiocherdene@gmail.com</p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-[#F5F3FF] p-6 rounded-lg space-y-4">
              <h2 className="text-sm font-bold text-[#4F46E5]">УР ЧАДВАР</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    Програмчлал & Технологиуд
                  </h3>
                  <ul className="space-y-1">
                    <li className="text-sm text-gray-700">
                      • JavaScript, TypeScript
                    </li>
                    <li className="text-sm text-gray-700">
                      • HTML, CSS / Sass
                    </li>
                    <li className="text-sm text-gray-700">• React, Next.js</li>
                    <li className="text-sm text-gray-700">
                      • Node.js, Express
                    </li>
                    <li className="text-sm text-gray-700">• REST API</li>
                    <li className="text-sm text-gray-700">
                      • MongoDB, MySQL, PostgreSQL
                    </li>
                    <li className="text-sm text-gray-700">
                      • Integration test, E2E test
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    Хувь хүний ур чадвар
                  </h3>
                  <ul className="space-y-1">
                    <li className="text-sm text-gray-700">
                      • Багаар ажиллах чадвартай
                    </li>
                    <li className="text-sm text-gray-700">
                      • Харилцааны сайн ур чадвартай
                    </li>
                    <li className="text-sm text-gray-700">
                      • Хариуцлагатай, хурдан дасан зохицох чадвартай
                    </li>
                    <li className="text-sm text-gray-700">
                      • IT office орчинд ажиллах суурь ойлголттой
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Language Skills Section */}
            <div className="bg-[#F5F3FF] p-6 rounded-lg space-y-4">
              <h2 className="text-sm font-bold text-[#4F46E5]">
                ХЭЛНИЙ МЭДЛЭГ
              </h2>

              <ul className="space-y-1">
                <li className="text-sm text-gray-700">• Монгол хэл – Төрөлх</li>
                <li className="text-sm text-gray-700">
                  • Япон хэл – N2 түвшин
                </li>
                <li className="text-sm text-gray-700">• Англи хэл – B1</li>
              </ul>
            </div>

            {/* Education Section */}
            <div className="bg-[#F5F3FF] p-6 rounded-lg space-y-4">
              <h2 className="text-sm font-bold text-[#4F46E5]">БОЛОВСРОЛ</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    Бүрэн дунд боловсрол
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Монгол Улсын Их Сургууль
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    (3-р курс хүртэл суралцсан)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
