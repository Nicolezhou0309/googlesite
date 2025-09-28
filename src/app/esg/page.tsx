'use client'

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageProvider'
import { getBannerImageUrl } from '@/lib/imageConfig'

export default function ESGPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedYear, setSelectedYear] = useState('2024')
  const [shouldLoadPDF, setShouldLoadPDF] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // PDF懒加载效果
  useEffect(() => {
    const handleScroll = () => {
      const pdfSection = document.getElementById('pdf-section')
      if (pdfSection) {
        const rect = pdfSection.getBoundingClientRect()
        // 当PDF区域距离视口顶部还有200px时就开始加载
        const isVisible = rect.top < (window.innerHeight + 200) && rect.bottom > 0
        if (isVisible && !shouldLoadPDF) {
          setShouldLoadPDF(true)
        }
      }
    }

    // 初始检查
    handleScroll()
    
    // 添加滚动监听，使用节流优化性能
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [shouldLoadPDF])

  const content = {
    zh: {
      title: 'ESG承诺',
      subtitle: '共建美好未来',
      introduction: '在微领地，我们深信企业的长远发展源于对环境（E）、社会（S）和治理（G）的坚定承诺。我们致力于为您提供优质的产品和服务，与您携手打造更美好的社区和未来。',
      
      // 环境部分
      environment: {
        title: '环境责任 (E)',
        icon: '🌱',
        content: '在环境方面，我们在项目施工的过程中，增加了可再生能源材料的应用。例如用太阳能替代传统电力消耗，引进环保卫浴设施。与此同时，我们邀请您加入我们的"绿色星球app"大家庭，您可以在app完成绿色行动打卡！一起培养环保，健康的生活习惯。'
      },
      
      // 社会责任部分
      social: {
        title: '社会责任 (S)',
        icon: '🤝',
        content: '在社会责任方面。我们为不同性别，年龄，学历的员工提供平等的就业机会；我们秉承"商业向善"的理念，参加到各类公益项目中。包括"阳光新希望""阳光好人"等。我们也成立了志愿小组，号召更多向您一样的有志青年加入到社会责任中。'
      },
      
      // 治理部分
      governance: {
        title: '公司治理 (G)',
        icon: '🏛️',
        content: '在治理方面，我们坚持合规合法经营，保护您的信息安全和合法权益。并结合现代技术，实现更规范化的社区管理，为您营造安全，舒适的居住环境。'
      },
      
      // 结尾部分
      conclusion: '我们相信，ESG不仅是理念，更是行动。从选择我们的这一刻起，让我们携手为社区、为地球家园贡献力量，共同创造更美好的未来！',
      
    },
    en: {
      title: 'ESG Commitment',
      subtitle: 'Building a Better Future Together',
      introduction: 'At Vlinker, we firmly believe that long-term corporate development stems from our unwavering commitment to Environment (E), Social (S), and Governance (G). We are not only dedicated to providing you with quality products and services, but also hope to work hand in hand with you to create a better community and future.',
      
      // 环境部分
      environment: {
        title: 'Environmental Responsibility (E)',
        icon: '🌱',
        content: 'In terms of environment, we have increased the application of renewable energy materials during project construction. For example, using solar energy to replace traditional power consumption and introducing environmentally friendly bathroom facilities. At the same time, we invite you to join our "Green Planet App" family, where you can complete green action check-ins! Let\'s cultivate environmentally friendly and healthy living habits together.'
      },
      
      // 社会责任部分
      social: {
        title: 'Social Responsibility (S)',
        icon: '🤝',
        content: 'In terms of social responsibility, we provide equal employment opportunities for employees of different genders, ages, and educational backgrounds. We adhere to the concept of "Business for Good" and participate in various public welfare projects, including "Sunshine New Hope" and "Sunshine Good People". We have also established volunteer groups to call on more aspiring young people like you to join in social responsibility.'
      },
      
      // 治理部分
      governance: {
        title: 'Corporate Governance (G)',
        icon: '🏛️',
        content: 'In terms of governance, we adhere to compliant and legal operations, protecting your information security and legitimate rights and interests. Combined with modern technology, we achieve more standardized community management to create a safe and comfortable living environment for you.'
      },
      
      // 结尾部分
      conclusion: 'We believe that ESG is not just a concept, but action. We look forward to becoming one family with you. From the moment you choose us, let\'s work together to contribute to this community and our shared Earth home. Let\'s make the future more beautiful together!',
      
    }
  }

  const currentContent = content[language as keyof typeof content] || content.zh


  return (
    <div className={`min-h-screen bg-white transition-all duration-700 ease-out ${
      isLoaded 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8'
    }`}>
      {/* Hero Banner Section */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7DA84C]/15 via-[#5a7a35]/15 to-[#4a6b2a]/15 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${getBannerImageUrl('摄图网_501574581_航拍蜿蜒道路与森林(企业商用).webp')}')`
          }}
        ></div>
        <div className="relative z-20 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-5xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
              {currentContent.title}
            </h1>
            <p className="text-2xl md:text-3xl opacity-90 mb-8" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
              {currentContent.subtitle}
            </p>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl md:text-2xl leading-relaxed text-gray-700" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
              {currentContent.introduction}
            </p>
          </div>
        </div>
      </section>

      {/* ESG Three Pillars Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Environment (E) */}
            <div className="group relative bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
                  {currentContent.environment.title}
                </h3>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
                  {currentContent.environment.content}
                </p>
              </div>
            </div>

            {/* Social (S) */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
                  {currentContent.social.title}
                </h3>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
                  {currentContent.social.content}
                </p>
              </div>
            </div>

            {/* Governance (G) */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-violet-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
                  {currentContent.governance.title}
                </h3>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
                  {currentContent.governance.content}
                </p>
              </div>
            </div>
          </div>

          {/* Conclusion Section */}
          <div className="text-center bg-gradient-to-r from-[#7DA84C]/10 to-[#5a7a35]/10 rounded-3xl p-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-medium" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
                {currentContent.conclusion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Report Section */}
      <section id="pdf-section" className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
              {language === 'zh' ? 'ESG可持续发展报告' : 'ESG Sustainability Report'}
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
              {language === 'zh' 
                ? '查看我们的完整ESG可持续发展报告，了解微领地在环境、社会和治理方面的承诺与实践。'
                : 'View our complete ESG sustainability report to learn about Vlinker\'s commitments and practices in environmental, social, and governance aspects.'
              }
            </p>
          </div>
          
          {/* Year Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedYear('2024')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedYear === '2024'
                      ? 'bg-[#7DA84C] text-white shadow-md'
                      : 'text-gray-600 hover:text-[#7DA84C] hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: 'HarmonyOS Sans SC' }}
                >
                  {language === 'zh' ? '2024年度报告' : '2024 Annual Report'}
                </button>
                <button
                  onClick={() => setSelectedYear('2023')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedYear === '2023'
                      ? 'bg-[#7DA84C] text-white shadow-md'
                      : 'text-gray-600 hover:text-[#7DA84C] hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: 'HarmonyOS Sans SC' }}
                >
                  {language === 'zh' ? '2023年度报告' : '2023 Annual Report'}
                </button>
              </div>
            </div>
          </div>
          
          {/* PDF Viewer */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="w-full h-[800px] relative">
              {!shouldLoadPDF ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-2xl">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7DA84C] mx-auto mb-4"></div>
                    <p className="text-gray-600" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
                      {language === 'zh' ? '正在加载报告...' : 'Loading report...'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
                      {language === 'zh' ? '请滚动到此处查看报告' : 'Scroll here to view report'}
                    </p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={
                    selectedYear === '2024'
                      ? (language === 'zh' ? '/PDF/2024-VLD-ESG.pdf' : '/PDF/2024-VLD-ESG-EN.pdf')
                      : (language === 'zh' ? '/PDF/2023-VLD-ESG.pdf' : '/PDF/2023-VLD-ESG-EN.pdf')
                  }
                  width="100%"
                  height="100%"
                  className="rounded-2xl border-0"
                  title={
                    selectedYear === '2024'
                      ? (language === 'zh' ? '微领地ESG可持续发展报告 2024' : 'Vlinker ESG Sustainability Report 2024')
                      : (language === 'zh' ? '微领地ESG可持续发展报告 2023' : 'Vlinker ESG Sustainability Report 2023')
                  }
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
