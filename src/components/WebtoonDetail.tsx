import { webtoon } from "@/models/webtoon";

export default function WebtoonDetail({webtoon} : {webtoon : webtoon}) {
  return (
    <div className="w-full">
        <img className = "mx-auto mb-10" src = {webtoon.thumbnailUrl} width={300} />
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-white">WEBTOON INFORMATION</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Webtoon detail informations and comments</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">제목</dt>
            <dd className="mt-1 text-sm/6 text-white sm:col-span-2 sm:mt-0">{webtoon.title}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">장르</dt>
            <dd className="mt-1 text-sm/6 text-white sm:col-span-2 sm:mt-0">{webtoon.genre}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">요일</dt>
            <dd className="mt-1 text-sm/6 text-white sm:col-span-2 sm:mt-0">{webtoon.dayOfWeek}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">좋아요</dt>
            <dd className="mt-1 text-sm/6 text-white sm:col-span-2 sm:mt-0">{webtoon.likeCount}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">플랫폼</dt>
            <dd className="mt-1 text-sm/6 text-white sm:col-span-2 sm:mt-0">
              {webtoon.platform}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          </div>
        </dl>
      </div>
    </div>
  )
}