'use client'

import { useLanguage } from '@/contexts/LanguageProvider'
import { useTranslations } from '@/lib/translations'

export default function PrivacyPage() {
  const { language } = useLanguage()
  const t = useTranslations(language)

  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t.privacy.title}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              {t.privacy.sections.introduction.content}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t.privacy.sections.dataCollection.title}
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacy.sections.dataCollection.content}
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              {t.privacy.sections.dataCollection.deviceInfo.title}
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacy.sections.dataCollection.deviceInfo.content}
            </p>

            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li className="mb-2">
                {t.privacy.sections.dataCollection.deviceInfo.technologies.logFiles}
              </li>
              <li className="mb-2">
                {t.privacy.sections.dataCollection.deviceInfo.technologies.webBeacons}
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              {t.privacy.sections.dataCollection.orderInfo.title}
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacy.sections.dataCollection.orderInfo.content}
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              {t.privacy.sections.dataCollection.personalInfo.title}
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              {t.privacy.sections.dataCollection.personalInfo.content}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t.privacy.sections.dataUsage.title}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacy.sections.dataUsage.orderInfoUsage.content}
            </p>

            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {t.privacy.sections.dataUsage.orderInfoUsage.list.map((item, index) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>

            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacy.sections.dataUsage.deviceInfoUsage.content}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t.privacy.sections.dataSharing.title}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacy.sections.dataSharing.content}
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacy.sections.dataSharing.shopify.content}
              <a href={t.privacy.sections.dataSharing.shopify.link} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                {t.privacy.sections.dataSharing.shopify.link}
              </a>.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacy.sections.dataSharing.googleAnalytics.content}
              <a href={t.privacy.sections.dataSharing.googleAnalytics.privacyLink} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                {t.privacy.sections.dataSharing.googleAnalytics.privacyLink}
              </a>.
              {language === 'en' && (
                <>
                  {' '}You can also opt-out of Google Analytics here:
                  <a href={t.privacy.sections.dataSharing.googleAnalytics.optOutLink} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                    {t.privacy.sections.dataSharing.googleAnalytics.optOutLink}
                  </a>.
                </>
              )}
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              {t.privacy.sections.dataSharing.legalCompliance.content}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t.privacy.sections.behavioralAdvertising.title}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacy.sections.behavioralAdvertising.content}
              {language === 'en' && (
                <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                  http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
                </a>
              )}.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacy.sections.behavioralAdvertising.optOut.content}
            </p>

            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li className="mb-2">
                <a href="https://www.facebook.com/settings/?tab=ads" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                  {t.privacy.sections.behavioralAdvertising.optOut.links.facebook}
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.google.com/settings/ads/anonymous" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                  {t.privacy.sections.behavioralAdvertising.optOut.links.google}
                </a>
              </li>
              <li className="mb-2">
                <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                  {t.privacy.sections.behavioralAdvertising.optOut.links.bing}
                </a>
              </li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              {t.privacy.sections.behavioralAdvertising.optOut.digitalAdvertising.content}
              <a href={t.privacy.sections.behavioralAdvertising.optOut.digitalAdvertising.link} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                {t.privacy.sections.behavioralAdvertising.optOut.digitalAdvertising.link}
              </a>.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t.privacy.sections.doNotTrack.title}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              {t.privacy.sections.doNotTrack.content}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t.privacy.sections.userRights.title}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacy.sections.userRights.europeanResidents.content}
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacy.sections.userRights.dataTransfer.content}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t.privacy.sections.dataRetention.title}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              {t.privacy.sections.dataRetention.content}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t.privacy.sections.changes.title}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              {t.privacy.sections.changes.content}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              {t.privacy.sections.contact.title}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacy.sections.contact.content}
            </p>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>{language === 'en' ? 'Email:' : '邮箱：'}</strong>
                <a href={`mailto:${t.privacy.sections.contact.email}`} className="text-blue-600 hover:text-blue-800 underline">
                  {t.privacy.sections.contact.email}
                </a>
              </p>
              <p className="text-gray-700">
                <strong>{language === 'en' ? 'Mailing Address:' : '邮寄地址：'}</strong> {t.privacy.sections.contact.address}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                {t.privacy.lastUpdated}: {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
