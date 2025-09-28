'use client'

import React, { useState } from 'react'
import Link from 'next/link'
// 使用 HeroUI 的图标或自定义图标
import { useLanguage } from '@/contexts/LanguageProvider'
import { useTranslations } from '@/lib/translations'

// 自定义弹窗组件
const CustomModal = ({ isOpen, onClose, title, message, type = 'success' }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error';
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
        <div className="flex items-center mb-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
            type === 'success' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {type === 'success' ? (
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              type === 'success' 
                ? 'bg-[#7da84c] text-white hover:bg-[#6a8f3f]' 
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Footer() {
  const { language } = useLanguage()
  const t = useTranslations(language)
  
  // 弹窗状态管理
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error'
  });

  // 防重复提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 滚动到联系表单
  const scrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const showModal = (title: string, message: string, type: 'success' | 'error' = 'success') => {
    setModal({ isOpen: true, title, message, type });
  };

  const hideModal = () => {
    setModal({ isOpen: false, title: '', message: '', type: 'success' });
  };

  return (
    <>
      <footer className="bg-white">
        {/* Contact Us 区域 */}
        <div id="contact" className="bg-[#7da84c] py-8 sm:py-12 lg:py-16">
          <div className="max-w-5xl mx-auto px-0 sm:px-6 lg:px-8">
            <div className="bg-[#7da84c] overflow-hidden p-0 sm:p-6 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
                <div className="text-white px-4 sm:px-0 pb-6 lg:pb-0">
                  <h2 className="font-bold text-2xl sm:text-3xl lg:text-[32px] xl:text-[40px] mb-4 sm:mb-6">
                    {t.contact.title}
                  </h2>
                  
                  {/* 小屏幕端联系方式布局 */}
                  <div className="block sm:hidden">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {/* 左侧：微信和二维码 */}
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8.5 12c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5zm7 0c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-sm mb-1">
                              {t.contact.wechat}
                            </h3>
                            <p className="text-sm">VibeLivingShanghai</p>
                          </div>
                        </div>
                        
                        {/* 二维码占位符 */}
                        <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                          </div>
                          <p className="text-xs opacity-80">扫码添加微信</p>
                        </div>
                      </div>
                      
                      {/* 右侧：手机号和邮箱 */}
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-sm mb-1">
                              {t.contact.phone}
                            </h3>
                            <p className="text-sm">+86 21 XXXX XXXX</p>
                            <p className="text-xs opacity-80">
                              {t.contact.phoneSupport}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-sm mb-1">
                              {t.contact.email}
                            </h3>
                            <p className="text-sm">info@vibeliving.com</p>
                            <p className="text-xs opacity-80">
                              {t.contact.emailSupport}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-white text-sm">
                        {t.contact.rentalJourney}
                      </p>
                    </div>
                  </div>
                  
                  {/* 中等屏幕及以上：原有布局 */}
                  <div className="hidden sm:block space-y-4 sm:space-y-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="white">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-[16px] mb-1 sm:mb-2">
                          {t.contact.phone}
                        </h3>
                        <p className="text-sm sm:text-[16px]">+86 21 XXXX XXXX</p>
                        <p className="text-xs sm:text-[14px] opacity-80">
                          {t.contact.phoneSupport}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="white">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-[16px] mb-1 sm:mb-2">
                          {t.contact.email}
                        </h3>
                        <p className="text-sm sm:text-[16px]">info@vibeliving.com</p>
                        <p className="text-xs sm:text-[14px] opacity-80">
                          {t.contact.emailSupport}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.5 12c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5zm7 0c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-[16px] mb-1 sm:mb-2">
                          {t.contact.wechat}
                        </h3>
                        <p className="text-sm sm:text-[16px]">VibeLivingShanghai</p>
                        <p className="text-xs sm:text-[14px] opacity-80">
                          {t.contact.wechatSupport}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 sm:mt-8">
                      <p className="text-white text-sm sm:text-[16px]">
                        {t.contact.rentalJourney}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 sm:p-6 lg:p-8">
                  <form className="space-y-4 sm:space-y-6" onSubmit={async (e: any) => {
                    e.preventDefault();
                    
                    // 防重复提交
                    if (isSubmitting) {
                      return;
                    }
                    
                    setIsSubmitting(true);
                    
                    const formData = new FormData(e.target as HTMLFormElement);
                    const email = formData.get('email');
                    const wechat = formData.get('wechat');
                    
                    if (!email && !wechat) {
                      showModal('Validation Error', 'Please provide either email address or WeChat ID for contact', 'error');
                      setIsSubmitting(false);
                      return;
                    }
                    
                    try {
                      // 准备数据
                      const name = formData.get('name') as string;
                      const university = formData.get('university') as string;
                      const arrivalDate = formData.get('arrivalDate') as string;
                      const message = formData.get('message') as string;
                      
                      // 构建remark字段：客户名称 + message + 入住时间
                      const remark = [
                        name ? `Name: ${name}` : '',
                        message ? `Message: ${message}` : '',
                        arrivalDate ? `Arrival Date: ${arrivalDate}` : ''
                      ].filter(Boolean).join(' | ');
                      
                      // 准备插入数据，按照通用广告端点格式
                      const insertData: any = {
                        external_id: `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // 生成外部ID
                        leadtype: '表单线索',
                        traffictype: '网站表单',
                        interactiontype: '表单提交'
                      };
                      
                      // 只添加非空值，按照通用广告端点字段映射
                      if (email && String(email).trim()) {
                        insertData.phone = String(email).trim();
                      }
                      if (wechat && String(wechat).trim()) {
                        insertData.wechat = String(wechat).trim();
                      }
                      if (university && String(university).trim()) {
                        insertData.location = String(university).trim();
                      }
                      if (remark && String(remark).trim()) {
                        insertData.remark = String(remark).trim();
                      }
                      
                      // 调试信息
                      console.log('Inserting data:', insertData);
                      
                      // 添加小延迟避免时间戳冲突
                      await new Promise(resolve => setTimeout(resolve, 100));
                      
                      // 使用通用广告端点API插入数据
                      try {
                        const response = await fetch('https://lead-service.vld.com.cn/ads-api/leads/ingest/generic', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            leads: [insertData],
                            platform: '海外站'
                          })
                        });

                        if (!response.ok) {
                          throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const result = await response.json();
                        console.log('Lead submitted successfully:', result);

                        // 检查通用广告端点的响应格式
                        if (result.code === '200' && result.message === 'success') {
                          console.log('Lead created successfully via generic ads endpoint');
                          showModal('Success!', 'Thank you for your inquiry! We will contact you soon.', 'success');
                        } else {
                          // 处理其他可能的成功响应格式
                          if (result.success) {
                            console.log('Lead created successfully:', result);
                            showModal('Success!', 'Thank you for your inquiry! We will contact you soon.', 'success');
                          } else {
                            throw new Error(result.error || result.message || 'Unknown error occurred');
                          }
                        }
                      } catch (error) {
                        console.error('Error submitting lead:', error);
                        console.error('Insert data was:', insertData);
                        showModal('Submission Failed', 'Failed to submit form. Please try again.', 'error');
                        setIsSubmitting(false);
                        return;
                      }
                      
                      // 重置表单
                      (e.target as HTMLFormElement).reset();
                      setIsSubmitting(false);
                      
                    } catch (error) {
                      console.error('Error submitting form:', error);
                      showModal('Submission Failed', 'Failed to submit form. Please try again.', 'error');
                      setIsSubmitting(false);
                    }
                  }}>
                      <div>
                        <label className="font-bold text-sm sm:text-[16px] text-black block mb-2">
                          {t.contact.name}
                        </label>
                        <input 
                          type="text" 
                          name="name" 
                          className="w-full h-10 sm:h-11 px-3 sm:px-4 bg-[#F5F5F5] border border-gray-300 rounded-lg text-sm sm:text-base focus:border-[#7da84c] focus:ring-2 focus:ring-[#7da84c] focus:ring-opacity-20 focus:outline-none transition-colors duration-200" 
                          placeholder={t.contact.namePlaceholder} 
                        />
                      </div>
                    
                    <div>
                      <label className="font-bold text-sm sm:text-[16px] text-black block mb-2">
                        {t.contact.email}
                      </label>
                      <input 
                        type="email" 
                        name="email" 
                        className="w-full h-10 sm:h-11 px-3 sm:px-4 bg-[#F5F5F5] border border-gray-300 rounded-lg text-sm sm:text-base focus:border-[#7da84c] focus:ring-2 focus:ring-[#7da84c] focus:ring-opacity-20 focus:outline-none transition-colors duration-200" 
                        placeholder={t.contact.emailPlaceholder} 
                      />
                    </div>
                    
                    <div>
                      <label className="font-bold text-sm sm:text-[16px] text-black block mb-2">
                        {t.contact.wechat}
                      </label>
                      <input 
                        type="text" 
                        name="wechat" 
                        className="w-full h-10 sm:h-11 px-3 sm:px-4 bg-[#F5F5F5] border border-gray-300 rounded-lg text-sm sm:text-base focus:border-[#7da84c] focus:ring-2 focus:ring-[#7da84c] focus:ring-opacity-20 focus:outline-none transition-colors duration-200" 
                        placeholder={t.contact.wechatPlaceholder} 
                      />
                    </div>
                    
                    <div>
                      <label className="font-bold text-sm sm:text-[16px] text-black block mb-2">
                        {t.contact.university}
                      </label>
                      <input 
                        type="text" 
                        name="university" 
                        className="w-full h-10 sm:h-11 px-3 sm:px-4 bg-[#F5F5F5] border border-gray-300 rounded-lg text-sm sm:text-base focus:border-[#7da84c] focus:ring-2 focus:ring-[#7da84c] focus:ring-opacity-20 focus:outline-none transition-colors duration-200" 
                        placeholder={t.contact.universityPlaceholder} 
                      />
                    </div>
                    
                    <div>
                      <label className="font-bold text-sm sm:text-[16px] text-black block mb-2">
                        {t.contact.arrivalDate}
                      </label>
                      <input type="date" name="arrivalDate" className="w-full h-10 sm:h-11 px-3 sm:px-4 bg-[#F5F5F5] border border-gray-300 rounded-lg text-sm sm:text-base focus:border-[#7da84c] focus:ring-2 focus:ring-[#7da84c] focus:ring-opacity-20 focus:outline-none transition-colors duration-200" />
                    </div>
                    
                    <div>
                      <label className="font-bold text-sm sm:text-[16px] text-black block mb-2">
                        {t.contact.message}
                      </label>
                      <textarea 
                        name="message" 
                        className="w-full h-20 sm:h-24 px-3 sm:px-4 py-2 bg-[#F5F5F5] border border-gray-300 rounded-lg text-sm sm:text-base focus:border-[#7da84c] focus:ring-2 focus:ring-[#7da84c] focus:ring-opacity-20 focus:outline-none transition-colors duration-200" 
                        placeholder={t.contact.messagePlaceholder}
                      ></textarea>
                    </div>
                    
                    <div className="text-center">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 sm:px-8 py-2 sm:py-3 rounded-[33.5px] font-bold text-base sm:text-lg lg:text-[20px] transition-colors duration-200 ${
                          isSubmitting 
                            ? 'bg-gray-400 text-white cursor-not-allowed' 
                            : 'bg-[#7da84c] text-white hover:bg-[#6a8f3f]'
                        }`}
                      >
                        {isSubmitting 
                          ? t.contact.submitting
                          : t.contact.submit
                        }
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 传统 Footer 内容 */}
        <div className="bg-[#7da84c] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-4 sm:gap-8">
              <div className="flex items-center">
                <img 
                  src="https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/logos/logo-white.svg" 
                  alt="Logo" 
                  className="h-6 sm:h-8 w-auto"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-4 sm:gap-8">
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  <Link href="/" className="text-white opacity-80 hover:opacity-100 text-sm sm:text-base">{t.footer.home}</Link>
                  <Link href="/communities" className="text-white opacity-80 hover:opacity-100 text-sm sm:text-base">{t.footer.communities}</Link>
                  <Link href="/apartments" className="text-white opacity-80 hover:opacity-100 text-sm sm:text-base">{t.footer.apartments}</Link>
                  <Link href="/" className="text-white opacity-80 hover:opacity-100 text-sm sm:text-base">{t.footer.aboutUs}</Link>
                </div>
                
                <div className="flex items-center gap-4">
                  <Link href="/privacy" className="text-white opacity-80 hover:opacity-100 text-sm sm:text-base">{t.footer.privacyPolicy}</Link>
                  
                  {/* 社交媒体关注 */}
                  <div className="hidden sm:flex items-center gap-3 ml-4">
                    <span className="text-white opacity-80 text-sm">{t.contact.followUs}:</span>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4 text-center text-white opacity-80">
              <p className="text-xs sm:text-sm">{t.footer.copyright} {t.footer.allRightsReserved}</p>
            </div>
          </div>
        </div>
    </footer>

      {/* 移动端和中等屏幕绿色联系我们飘带 */}
      <div className="mobile-contact-ribbon lg:hidden">
        <div 
          className="text-white py-4 sm:py-6 px-4 cursor-pointer h-full flex items-center justify-center"
          onClick={scrollToContact}
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-bold text-lg sm:text-xl">
              {t.contact.title}
            </span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* 自定义弹窗 */}
      <CustomModal
        isOpen={modal.isOpen}
        onClose={hideModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </>
  )
}
