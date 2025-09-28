'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageProvider';

interface PDFFile {
  name: string;
  path: string;
  year: string;
  language: 'zh' | 'en';
  size: string;
}

interface LazyPDFViewerProps {
  pdfFiles: PDFFile[];
  className?: string;
}

interface PDFPreviewProps {
  file: PDFFile;
  onDownload: (file: PDFFile) => void;
  onPreview: (file: PDFFile) => void;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ file, onDownload, onPreview }) => {
  const { language } = useLanguage();
  
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePreview = useCallback(async () => {
    setIsLoading(true);
    try {
      await onPreview(file);
    } finally {
      setIsLoading(false);
    }
  }, [file, onPreview]);

  const handleDownload = useCallback(() => {
    onDownload(file);
  }, [file, onDownload]);

  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePreview}
    >
      {/* PDF Icon */}
      <div className="flex items-center justify-center mb-4">
        <div className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'bg-red-500 scale-110' : 'bg-red-100'
        }`}>
          <svg className={`w-8 h-8 transition-colors duration-300 ${
            isHovered ? 'text-white' : 'text-red-500'
          }`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        </div>
      </div>

      {/* File Info */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
          {file.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
          {file.year} • {file.size}
        </p>
        <p className="text-xs text-gray-400 mb-4" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
          {language === 'zh' ? '点击预览PDF报告' : 'Click to preview PDF report'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePreview();
          }}
          disabled={isLoading}
          className="flex-1 bg-[#7DA84C] hover:bg-[#6a8f3f] disabled:bg-gray-400 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-1"
          style={{ fontFamily: 'HarmonyOS Sans SC' }}
        >
          {isLoading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{language === 'zh' ? '加载中...' : 'Loading...'}</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
              </svg>
              <span>{language === 'zh' ? '预览' : 'Preview'}</span>
            </>
          )}
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-1"
          style={{ fontFamily: 'HarmonyOS Sans SC' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
          <span>{language === 'zh' ? '下载' : 'Download'}</span>
        </button>
      </div>
    </div>
  );
};

const PDFModal: React.FC<{
  file: PDFFile | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ file, isOpen, onClose }) => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && file) {
      setIsLoading(true);
      setError(null);
    }
  }, [isOpen, file]);

  const handleDownload = () => {
    if (file) {
      const link = document.createElement('a');
      link.href = file.path;
      link.download = file.name;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen || !file) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
              {file.name}
            </h2>
            <p className="text-sm text-gray-500" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
              {file.year} • {file.size}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleDownload}
              className="bg-[#7DA84C] hover:bg-[#6a8f3f] text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2"
              style={{ fontFamily: 'HarmonyOS Sans SC' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              <span>{language === 'zh' ? '下载' : 'Download'}</span>
            </button>
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 p-6 overflow-hidden">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg className="w-12 h-12 animate-spin text-[#7DA84C] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
                  {language === 'zh' ? '正在加载PDF...' : 'Loading PDF...'}
                </p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-red-600 mb-4" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
                  {error}
                </p>
                <button
                  onClick={() => {
                    setError(null);
                    setIsLoading(true);
                  }}
                  className="bg-[#7DA84C] hover:bg-[#6a8f3f] text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  style={{ fontFamily: 'HarmonyOS Sans SC' }}
                >
                  {language === 'zh' ? '重试' : 'Retry'}
                </button>
              </div>
            </div>
          )}

          <iframe
            src={`${file.path}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            className="w-full h-full border-0 rounded-lg"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setError(language === 'zh' ? 'PDF加载失败，请尝试下载文件' : 'Failed to load PDF, please try downloading the file');
            }}
            title={file.name}
          />
        </div>
      </div>
    </div>
  );
};

const LazyPDFViewer: React.FC<LazyPDFViewerProps> = ({ pdfFiles, className = '' }) => {
  const [selectedFile, setSelectedFile] = useState<PDFFile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleFiles, setVisibleFiles] = useState<PDFFile[]>([]);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isIntersecting) {
          setIsIntersecting(true);
          // 延迟加载PDF文件列表
          setTimeout(() => {
            setVisibleFiles(pdfFiles);
          }, 300);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [pdfFiles, isIntersecting]);

  const handlePreview = useCallback((file: PDFFile) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  }, []);

  const handleDownload = useCallback((file: PDFFile) => {
    const link = document.createElement('a');
    link.href = file.path;
    link.download = file.name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedFile(null);
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {!isIntersecting ? (
        // Loading placeholder
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 animate-pulse">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
              </div>
              <div className="flex space-x-2 mt-4">
                <div className="flex-1 h-8 bg-gray-200 rounded"></div>
                <div className="flex-1 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Actual PDF files
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleFiles.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PDFPreview
                file={file}
                onPreview={handlePreview}
                onDownload={handleDownload}
              />
            </div>
          ))}
        </div>
      )}

      {/* PDF Modal */}
      <PDFModal
        file={selectedFile}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default LazyPDFViewer;
