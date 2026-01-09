import { Mail, MapPin, Phone, Github } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background p-8 print:p-0">
      <div className="mx-auto max-w-7xl bg-white shadow-lg print:shadow-none">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
          {/* Main Content */}
          <div className="space-y-8 p-8 lg:p-12">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-[#4F46E5] ">
                Т.Цэцэг-Өлзий Оч-Эрдэнэ
              </h1>
              <p className="text-xl font-medium text-muted-foreground">
                Програм хангамжийн хөгжүүлэгч
              </p>
            </div>

            {/* Professional Summary */}
            <div className="space-y-3 leading-relaxed text-foreground">
              <p>
                Fullstack хөгжүүлэлтийн чиглэлээр UI/UX, backend логик,
                authentication зэрэг үндсэн функцүүд дээр ажиллаж, нийт 9+ төсөл
                (3 Fullstack, 4 Frontend, 2 Backend) хэрэгжүүлсэн. Хөгжүүлэлтийн
                явцад багийн ажлыг зохион байгуулж, процессыг уялдуулах,
                чанартай шийдэл гаргахад анхааран ажилласан. Одоогоор аливаа
                компанид албан ёсоор ажиллаж байсан туршлагагүй боловч төслүүд
                дээр тууштай, хариуцлагатайгаар ажиллаж ирсэн бөгөөд цаашид нэг
                компанид тогтвор суурьшилтай, урт хугацаанд өсөж хөгжих
                зорилготой.
              </p>
            </div>

            {/* Projects */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#4F46E5] uppercase tracking-wide ">
                Төслүүд
              </h2>

              {/* Project 1 - EventLux */}
              <div className="space-y-3 border-l-4 border-[#4F46E5] pl-6">
                <div>
                  <p className="text-sm font-medium uppercase text-muted-foreground">
                    Full Stack Вэб хөгжүүлэлт
                  </p>
                  <h3 className="text-xl font-bold text-foreground">
                    EventLux
                  </h3>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-foreground">
                    Төслийн товч тайлбар
                  </p>
                  <p className="leading-relaxed text-foreground">
                    Арга хэмжээний танхим захиалах, хөтлөгч болон уран бүтээлч
                    сонгох, захиалгын явцыг хянах боломжтой fullstack веб
                    платформ.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Миний оролцоо</p>
                  <ul className="list-inside list-disc space-y-1.5 leading-relaxed text-foreground">
                    <li>
                      Төслийн багийг ахалж, route бүтэц, authentication болон
                      хөгжүүлэлтийн суурь шийдлийг тодорхойлсон
                    </li>
                    <li>
                      Алдаа засвар, navigation логик сайжруулалт хийж, системийн
                      тогтвортой ажиллагааг хангасан
                    </li>
                    <li>
                      GitHub ашиглан merge conflict шийдвэрлэж, багийн кодын
                      чанарыг хянасан
                    </li>
                  </ul>
                </div>

                <a
                  href="https://ochko-turshilt-anqw.vercel.app/"
                  className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Төслийг үзэх
                </a>
              </div>

              {/* Project 2 - Unifind */}
              <div className="space-y-3 border-l-4 border-[#4F46E5] pl-6">
                <div>
                  <p className="text-sm font-medium uppercase text-muted-foreground">
                    Full Stack Вэб хөгжүүлэлт (Төсөл 2)
                  </p>
                  <h3 className="text-xl font-bold text-foreground">Unifind</h3>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-foreground">
                    Төслийн товч тайлбар
                  </p>
                  <p className="leading-relaxed text-foreground">
                    Олон их дээд сургуулиудын мэргэжил болон элсэлтийн
                    мэдээллийг нэг дороос хайх, элсэлт, бүртгэл хийх, хувийн
                    календарь дээр бүртгэж эхлэх болон дуусах өдрийг тэмдэглэх
                    боломжтой fullstack веб платформ.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Миний оролцоо</p>
                  <ul className="list-inside list-disc space-y-1.5 leading-relaxed text-foreground">
                    <li>
                      Багийг ахалж, route бүтэц, authentication болон
                      хөгжүүлэлтийн суурь шийдлийг төлөвлөсөн
                    </li>
                    <li>
                      Axios, Cheerio ашиглан тухайн сургуулийн сайтаас
                      мэдээллийг шууд fetch хийж, Regex ашиглан боловсруулсан;
                      ингэснээр мэдээллийг гараар оруулах шаардлагыг бууруулсан
                    </li>
                    <li>
                      Хувийн календарь дээр бүртгэл нэмэх, эхлэх/дуусах өдрийг
                      тэмдэглэх боломжийг нэвтрүүлсэн
                    </li>
                    <li>
                      Алдаа засвар, navigation болон notification логик
                      сайжруулж, системийн тогтвортой ажиллагааг ханган
                      ажилласан
                    </li>
                    <li>
                      GitHub ашиглан merge conflict шийдвэрлэж, багийн кодын
                      чанар, build алдааг хянасан
                    </li>
                  </ul>
                </div>

                <a
                  href="https://unifind-ruddy.vercel.app/"
                  className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Төслийг үзэх
                </a>
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-[#4F46E5]">
                Ажлын туршлага
              </h2>

              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      Япон улс
                    </h3>
                    <p className="text-lg font-medium text-muted-foreground">
                      Гэрээт ажилтан
                    </p>
                  </div>
                  <div className="rounded-full bg-primary px-4 py-1 text-sm font-bold text-primary-foreground">
                    3 жил
                  </div>
                </div>

                <ul className="list-inside list-disc space-y-1.5 leading-relaxed text-foreground">
                  <li>3 жилийн хугацаанд гэрээт ажил хийсэн</li>
                  <li>
                    Ажлын хариуцлага, сахилга бат, багаар ажиллах чадварыг
                    эзэмшсэн
                  </li>
                  <li>
                    Олон улсын орчинд ажиллаж, харилцааны ур чадвараа
                    сайжруулсан
                  </li>
                </ul>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-[#4F46E5]">
                Нэмэлт мэдээлэл
              </h2>

              <ul className="list-inside list-disc space-y-1.5 leading-relaxed text-foreground">
                <li>Software Engineering чиглэлээр ажиллах сонирхолтой</li>
                <li>Шинэ технологи тасралтгүй суралцах хүсэл эрмэлзэлтэй</li>
                <li>
                  Япон улсад сурч, ажилласан туршлага маань техникийн ойлголт,
                  зохион байгуулалтын ур чадварыг ІТ салбарт үр дүнтэй ашиглах
                  суурь болсон.
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 bg-muted/30 p-8 lg:p-12">
            {/* Contact */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-wide text-[#4F46E5]">
                Холбоо барих
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed text-foreground">
                    Улаанбаатар хот
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed text-foreground">
                    8870-3020
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span className="break-all text-sm leading-relaxed text-foreground">
                    tsetsegulziiocherdene@gmail.com
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Github className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <a
                    href="https://github.com/Ochko1105"
                    className="text-sm leading-relaxed text-foreground hover:text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/Ochko1105
                  </a>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-wide text-[#4F46E5]">
                Ур чадвар
              </h2>

              <div className="space-y-4 text-sm leading-relaxed text-foreground">
                <div>
                  <p className="font-semibold text-foreground">
                    Programming Languages:
                  </p>
                  <p>JavaScript, TypeScript, Dart, HTML, CSS</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground">Front-end:</p>
                  <p>
                    React, HTML5, CSS3, Flutter, React Native, TailwindCSS,
                    Framer Motion, Shadcn
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground">Back-end:</p>
                  <p>
                    NodeJS, ExpressJS, NextJS, PusherAPI, Mongoose, Prisma, JWT
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground">Databases:</p>
                  <p>MySQL, PostgreSQL, MongoDB</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    Tools & Platforms:
                  </p>
                  <p>
                    Git, Vercel, Firebase, Render, Copilot, Clerk, Nx monorepo,
                    Jest
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Skills */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-wide text-[#4F46E5]">
                Хувь хүний ур чадвар
              </h2>

              <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-foreground">
                <li>Багаар ажиллах чадвартай</li>
                <li>Харилцааны сайн ур чадвартай</li>
                <li>Хариуцлагатай, хурдан дасан зохицох чадвартай</li>
                <li>IT office орчинд ажиллах суурь ойлголттой</li>
              </ul>
            </div>

            {/* Languages */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-wide text-[#4F46E5]">
                Хэлний мэдлэг
              </h2>

              <div className="space-y-2 text-sm leading-relaxed text-foreground">
                <div className="flex justify-between">
                  <span className="font-medium">Монгол хэл</span>
                  <span className="text-muted-foreground">Төрөлх</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Япон хэл</span>
                  <span className="text-muted-foreground">N2 түвшин</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Англи хэл</span>
                  <span className="text-muted-foreground">В1</span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-wide text-[#4F46E5]">
                Боловсрол
              </h2>

              <div className="space-y-2 text-sm leading-relaxed text-foreground">
                <p className="font-semibold">Бүрэн дунд боловсрол</p>
                <p className="text-muted-foreground">
                  Монгол Улсын Их Сургууль
                  <br />
                  (3-р курс хүртэл суралцсан)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
