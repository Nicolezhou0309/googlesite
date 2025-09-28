import { NextRequest, NextResponse } from 'next/server'
// @ts-ignore
import OSS from 'ali-oss'
import { getFolderDisplayName } from '@/lib/folderTranslations'

// OSS配置
const ossConfig = {
  region: 'oss-cn-shanghai',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
  bucket: 'vlinker-site'
}

const client = new OSS(ossConfig)

// 获取指定路径下的所有图片文件
async function getImagesFromPath(prefix: string) {
  try {
    console.log('正在获取OSS路径:', prefix)
    const result = await client.list({
      prefix: prefix,
      'max-keys': 1000
    })
    
    console.log('OSS返回结果:', {
      prefix,
      objectCount: result.objects?.length || 0,
      objects: result.objects?.slice(0, 5).map((obj: any) => obj.name) || []
    })
    
    if (!result.objects) {
      console.log('没有找到任何对象')
      return []
    }
    
    // 过滤出图片文件并转换为前端需要的格式
    const images = result.objects
      .filter((obj: any) => {
        const fileName = obj.name.toLowerCase()
        const isImage = fileName.endsWith('.webp') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png')
        if (isImage) {
          console.log('找到图片文件:', obj.name)
        }
        return isImage
      })
      .map((obj: any) => {
        // 提取文件名和路径信息
        const fullPath = obj.name
        const pathParts = fullPath.split('/')
        const fileName = pathParts[pathParts.length - 1]
        const folderPath = pathParts.slice(0, -1).join('/')
        
        // 构建OSS URL
        const ossUrl = `https://vlinker-site.oss-cn-shanghai.aliyuncs.com/${fullPath}`
        
        return {
          src: ossUrl,
          width: 800,
          height: 600,
          alt: fileName.replace(/\.(webp|jpg|jpeg|png)$/i, ''),
          folder: folderPath,
          thumbnail: ossUrl,
          fileName: fileName,
          fullPath: fullPath
        }
      })
    
    console.log(`路径 ${prefix} 找到 ${images.length} 张图片`)
    return images
  } catch (error) {
    console.error('获取OSS图片列表失败:', error)
    return []
  }
}

// 获取社区的所有图片（优化版本 - 只在需要时获取所有图片）
async function getCommunityImages(communityId: string, specificFolder?: string) {
  // 如果指定了具体文件夹，只获取该文件夹的图片
  if (specificFolder) {
    console.log('获取指定文件夹图片:', specificFolder)
    
    // 不再忽略缩略图文件夹，允许访问所有文件夹
    
    // 构建完整的OSS路径
    let fullPath: string
    if (specificFolder.startsWith('户型图/')) {
      // 如果是户型图格式，构建完整路径
      fullPath = `public/images/communities/${communityId}/${specificFolder}/`
    } else if (specificFolder.startsWith('public/images/communities/')) {
      // 如果已经是完整路径，直接使用
      fullPath = specificFolder.endsWith('/') ? specificFolder : `${specificFolder}/`
    } else {
      // 其他情况，构建完整路径
      fullPath = `public/images/communities/${communityId}/${specificFolder}/`
    }
    
    console.log('构建的完整OSS路径:', fullPath)
    return await getImagesFromPath(fullPath)
  }
  
  // 否则获取所有图片（用于文件夹列表）- 包含所有文件夹
  const allImages = []
  
  // 并行获取所有类型的图片（包括缩略图）
  const [publicAreaImages, facadeImages, layoutImages, thumbnailImages] = await Promise.all([
    getImagesFromPath(`public/images/communities/${communityId}/公区/`),
    getImagesFromPath(`public/images/communities/${communityId}/外立面/`),
    getImagesFromPath(`public/images/communities/${communityId}/户型图/`),
    getImagesFromPath(`public/images/communities/${communityId}/缩略图/`)
  ])
  
  console.log('获取到的图片数量:', {
    publicArea: publicAreaImages.length,
    facade: facadeImages.length,
    layout: layoutImages.length,
    thumbnail: thumbnailImages.length
  })
  
  allImages.push(...publicAreaImages, ...facadeImages, ...layoutImages, ...thumbnailImages)
  
  return allImages
}

// 按文件夹分组图片
function groupImagesByFolder(images: any[]) {
  const grouped: Record<string, any[]> = {}
  
  images.forEach(image => {
    const folderPath = image.folder
    if (!grouped[folderPath]) {
      grouped[folderPath] = []
    }
    grouped[folderPath].push(image)
  })
  
  return grouped
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const communityId = searchParams.get('communityId')
    const folder = searchParams.get('folder')
    const page = parseInt(searchParams.get('page') || '0')
    const limit = parseInt(searchParams.get('limit') || '50')
    const language = (searchParams.get('language') || 'zh') as 'zh' | 'en'
    
    if (!communityId) {
      return NextResponse.json({ error: '缺少communityId参数' }, { status: 400 })
    }
    
    // 获取图片 - 如果指定了文件夹，只获取该文件夹的图片
    const allImages = await getCommunityImages(communityId, folder || undefined)
    
    // 过滤图片
    let filteredImages = allImages
    if (folder) {
      // 如果指定了文件夹，过滤出该文件夹的图片
      filteredImages = allImages.filter((image: any) => 
        image.folder === folder || image.folder?.includes(folder)
      )
    }
    
    // 分页处理
    const startIndex = page * limit
    const endIndex = startIndex + limit
    const paginatedImages = filteredImages.slice(startIndex, endIndex)
    
    // 按文件夹分组
    const groupedImages = groupImagesByFolder(filteredImages)
    
    // 包含所有文件夹，不再过滤缩略图文件夹
    const filteredFolderCounts = Object.keys(groupedImages)
      .map((folderPath: string) => {
        const folderName = folderPath.split('/').pop() || folderPath
        return {
          path: folderPath,
          count: groupedImages[folderPath].length,
          displayName: getFolderDisplayName(folderName, language)
        }
      })
    
    return NextResponse.json({
      images: paginatedImages,
      total: filteredImages.length,
      hasMore: endIndex < filteredImages.length,
      page,
      limit,
      groupedByFolder: groupedImages,
      folderCounts: filteredFolderCounts
    })
  } catch (error) {
    console.error('API错误:', error)
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}
