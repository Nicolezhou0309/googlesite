// 翻译配置文件
export interface Translations {
  // 导航栏
  navigation: {
    home: string;
    about: string;
    apartments: string;
    communities: string;
    services: string;
    esg: string;
    privacy: string;
  };
  
  // 英雄区域
  hero: {
    title: string,
    subtitle: string,
    cta: string,
    slides: {
      slide1: {
        title: string,
        subtitle: string,
        cta: string,
      };
      slide2: {
        title: string,
        subtitle: string,
        cta: string,
      };
      slide3: {
        title: string,
        subtitle: string,
        cta: string,
      };
    };
  };
  
  // 特色卡片
  features: {
    title: string,
    governmentCertified: {
      title: string,
      description: string,
    };
    designedForGenZ: {
      title: string,
      description: string,
    };
    fiveCommunities: {
      title: string,
      description: string,
    };
    thirtyThousandHouseholds: {
      title: string,
      description: string,
    };
  };
  
  // 社区页面
  communities: {
    carousel: {
      slide1: {
        title: string,
        description: string,
      };
      slide2: {
        title: string,
        description: string,
      };
      slide3: {
        title: string,
        description: string,
      };
    };
      grid: {
        learnMore: string;
        availableUnits: string;
        unitTypes: string;
        communityImage: string;
        priceRange: string;
        perMonth: string;
      tags: {
        parking: string;
        gym: string;
        freeBar: string;
        mediaRoom: string;
        coworkingStudySpaces: string;
        sharedKitchen: string;
        shuttleBus: string;
        gameRoom: string;
        billiardsRoom: string;
        communityGarden: string;
        basketballCourt: string;
        pingPongRoom: string;
        recordingStudio: string;
        yogaRoom: string;
      };
    };
      communities: {
        jinganCenter: {
          name: string,
          district: string;
          subwayInfo: string;
        };
        northHongqiao: {
          name: string,
          district: string;
          subwayInfo: string;
        };
        pujiangCenter: {
          name: string,
          district: string;
          subwayInfo: string;
        };
        hutaiRoad: {
          name: string,
          district: string;
          subwayInfo: string;
        };
        pujiangPark: {
          name: string,
          district: string;
          subwayInfo: string;
        };
      };
  };

  // 社区卡片内容
  communityCards: {
    jinganCenter: {
      title: string,
      tagline: string,
      features: {
        joyCity: string,
        jinganTemple: string,
        bund: string,
      };
    };
    northHongqiao: {
      title: string,
      tagline: string,
      features: {
        hongqiaoHub: string,
        highSpeedRail: string,
        weekendEscapes: string,
      };
    };
  };

  // 社区位置
  communityLocation: {
    title: string,
    subtitle: string,
    commutingTitle: string;
    commutingSubtitle: string,
    shuttleServiceDescription: string;
    viewDetails: string;
    availableUnits: string;
    priceRange: string;
    subwayInfo: string;
    tags: {
      new: string;
      popular: string;
      limited: string;
    };
    universities: {
      tongji: string;
      fudan: string;
      shufe: string;
      ecnu: string;
      nyu: string;
      usst: string;
      sjtu: string;
      sisu: string;
      ecust: string;
      dhu: string;
      shu: string;
      sues: string;
      shnu: string;
    };
  };
  
  // 生活方式选择
  lifestyle: {
    title: string,
    cta: string,
  };
  
  // 美食部分
  food: {
    title: string,
    subtitle: string,
    viewMenu: string;
    restaurants: {
      qiantangqiuhe: {
        name: string,
        description: string,
        cuisine: string;
        location: string;
        mustTry: string;
      };
      masMuslim: {
        name: string,
        description: string,
        cuisine: string;
        location: string;
        mustTry: string;
      };
      auntieFatty: {
        name: string,
        description: string,
        cuisine: string;
        location: string;
        mustTry: string;
      };
    };
  };
  
  // 服务导航部分
  servicesNavigation: {
    title: string,
    subtitle: string,
    services: {
      dailyTranslation: string;
      simCardRegistration: string;
      powerAdapterConversion: string;
      travelGuide: string;
      sharedBikeRentals: string;
      localFoodRecommendations: string;
      travelItinerarySuggestions: string;
      restaurantReservations: string;
      localAppInstallation: string;
      parcelCollectionService: string;
      medicalAppointmentAssistance: string;
      inHouseMaintenance: string;
    };
  };
  
  // 活动部分
  events: {
    title: string,
    subtitle: string,
    learnMore: string;
    activities: {
      cocktailGathering: {
        name: string,
        description: string,
      };
      foodSharingFair: {
        name: string,
        description: string,
      };
      freshmanParty: {
        name: string,
        description: string,
      };
    };
  };
  
  // 用户评价
  testimonials: {
    title: string,
    subtitle: string,
    reviews: {
      jules: {
        name: string,
        university: string;
        content: string;
      };
      emrys: {
        name: string,
        university: string;
        content: string;
      };
      williamson: {
        name: string,
        university: string;
        content: string;
      };
    };
  };
  
  // 服务支持
  services: {
    title: string,
    subtitle: string,
    freeWifi: string;
    translationAssistance: string;
    simCardRegistration: string;
    powerAdapterConversion: string;
    bankAccountOpening: string;
    insuranceConsultation: string;
    visaExtension: string;
    jobSearchSupport: string;
    culturalEvents: string;
    communityActivities: string;
    emergencySupport: string;
    healthCheckup: string;
    travelGuide: string;
    apartmentViewing: string;
    legalDocumentation: string;
    culturalOrientation: string;
  };
  
  
  // 联系我们
  contact: {
    title: string,
    subtitle: string,
    name: string,
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    successMessage: string;
    errorMessage: string;
    wechat: string;
    wechatPlaceholder: string;
    university: string;
    universityPlaceholder: string;
    arrivalDate: string;
    phoneSupport: string;
    emailSupport: string;
    wechatSupport: string;
    followUs: string;
    rentalJourney: string;
  };
  
  // 页脚
  footer: {
    about: string;
    aboutDescription: string;
    quickLinks: string;
    services: string;
    contact: string;
    followUs: string;
    copyright: string;
    allRightsReserved: string;
    home: string;
    communities: string;
    apartments: string;
    aboutUs: string;
    legalInfo: string;
    privacyPolicy: string;
  };
  
  // 通用
  common: {
    learnMore: string;
    viewDetails: string;
    contactUs: string;
    readMore: string;
    close: string;
    loading: string;
    error: string;
    success: string;
    noImagesToDisplay: string;
  };
  
  // 隐私政策页面
  privacy: {
    title: string;
    description: string;
    lastUpdated: string;
    sections: {
      introduction: {
        title: string;
        content: string;
      };
      dataCollection: {
        title: string;
        content: string;
        deviceInfo: {
          title: string;
          content: string;
          technologies: {
            title: string;
            logFiles: string;
            webBeacons: string;
          };
        };
        orderInfo: {
          title: string;
          content: string;
        };
        personalInfo: {
          title: string;
          content: string;
        };
      };
      dataUsage: {
        title: string;
        orderInfoUsage: {
          content: string;
          list: string[];
        };
        deviceInfoUsage: {
          content: string;
        };
      };
      dataSharing: {
        title: string;
        content: string;
        shopify: {
          content: string;
          link: string;
        };
        googleAnalytics: {
          content: string;
          privacyLink: string;
          optOutLink: string;
        };
        legalCompliance: {
          content: string;
        };
      };
      behavioralAdvertising: {
        title: string;
        content: string;
        optOut: {
          content: string;
          links: {
            facebook: string;
            google: string;
            bing: string;
          };
          digitalAdvertising: {
            content: string;
            link: string;
          };
        };
      };
      doNotTrack: {
        title: string;
        content: string;
      };
      userRights: {
        title: string;
        europeanResidents: {
          content: string;
        };
        dataTransfer: {
          content: string;
        };
      };
      dataRetention: {
        title: string;
        content: string;
      };
      changes: {
        title: string;
        content: string;
      };
      contact: {
        title: string;
        content: string;
        email: string;
        address: string;
      };
    };
  };
}

export const translations: Record<'zh' | 'en', Translations> = {
  zh: {
    navigation: {
      home: '首页',
      about: '首页',
      apartments: '户型展示',
      communities: '社区位置',
      services: '服务支持',
      esg: 'ESG报告',
      privacy: '隐私政策',
    },
    hero: {
      title: '安心落脚，感受归属，\n活出精彩',
      subtitle: '不仅仅是家，是归属感',
      cta: '预约看房',
      slides: {
        slide1: {
          title: '安心落脚，感受归属，\n活出精彩',
          subtitle: '不仅仅是家，是归属感',
          cta: '探索我们的社区',
        },
        slide2: {
          title: '家的温暖，不必昂贵',
          subtitle: '从一居室到LOFT，每一平米都物超所值',
          cta: '预约看房',
        },
        slide3: {
          title: '完善配套设施\n品质生活保障',
          subtitle: '健身房、瑜伽室、办公空间等一应俱全，让生活更加丰富多彩',
          cta: '预约看房',
        },
      },
    },
    features: {
      title: '什么是微领地青年社区？',
      governmentCertified: {
        title: '政府认证',
        description: '官方认证人才公寓',
      },
      designedForGenZ: {
        title: '为Z世代设计',
        description: '年轻活力的社区',
      },
      fiveCommunities: {
        title: '五大社区',
        description: '覆盖上海核心区域',
      },
      thirtyThousandHouseholds: {
        title: '3万+住户',
        description: '值得信赖的选择',
      },
    },
    communities: {
      carousel: {
        slide1: {
          title: 'Exquisite Studio',
          description: 'Fashionable comfortable，comfortable,and fully functional'
        },
        slide2: {
          title: 'Super Community',
          description: 'leading a new lifestyle'
        },
        slide3: {
          title: 'Enriched Common Area',
          description: 'Hassle-free Experience'
        }
      },
      grid: {
        learnMore: '了解更多',
        availableUnits: '可租房源',
        unitTypes: '种房型',
        communityImage: '社区图片',
        priceRange: '价格区间',
        perMonth: '/月',
        tags: {
          parking: '停车位',
          gym: '健身房',
          freeBar: '免费酒吧',
          mediaRoom: '媒体室',
          coworkingStudySpaces: '联合办公与学习空间',
          sharedKitchen: '共享厨房',
          shuttleBus: '班车服务',
          gameRoom: '游戏室',
          billiardsRoom: '台球室',
          communityGarden: '社区花园',
          basketballCourt: '篮球场',
          pingPongRoom: '乒乓球室',
          recordingStudio: '录音室',
          yogaRoom: '瑜伽室'
        }
      },
      communities: {
        jinganCenter: {
          name: '静安中心社区',
          district: '静安区',
          subwayInfo: '地铁1号线彭浦新村站步行500米'
        },
        northHongqiao: {
          name: '北虹桥社区',
          district: '嘉定区',
          subwayInfo: '地铁13号线金运路站约300米'
        },
        pujiangCenter: {
          name: '浦江中心社区',
          district: '闵行区',
          subwayInfo: '地铁8号线沈杜公路站5分钟直达'
        },
        hutaiRoad: {
          name: '沪太路社区',
          district: '静安区',
          subwayInfo: '地铁7号线大场镇站200米'
        },
        pujiangPark: {
          name: '浦江公园社区',
          district: '闵行区',
          subwayInfo: '地铁8号线沈杜公路站600米'
        }
      }
    },
    // 社区卡片内容
    communityCards: {
      jinganCenter: {
        title: '生活在快车道，拥有城市脉搏',
        tagline: '就在静安中心社区',
        features: {
          joyCity: '10分钟到大悦城（上海秋叶原）',
          jinganTemple: '20分钟到静安寺',
          bund: '30分钟到外滩'
        }
      },
      northHongqiao: {
        title: '逃离喧嚣，发现你的周末节奏',
        tagline: '就在北虹桥社区',
        features: {
          hongqiaoHub: '20分钟到虹桥枢纽',
          highSpeedRail: '轻松到达高铁站和机场',
          weekendEscapes: '周末出行的理想选择'
        }
      }
    },
    communityLocation: {
      title: '社区位置',
      subtitle: '探索我们的五大社区，每个都位于上海的核心区域',
      commutingTitle: '减少通勤时间，\n更多精力探索',
      commutingSubtitle: '减少通勤时间，更多精力探索',
      shuttleServiceDescription: '我们的社区位于上海各大高校附近。为提供更多便利，我们提供直达校园的专属班车服务。只需专心学习，探索您的海外生活。',
      viewDetails: '查看详情',
      availableUnits: '可租房源',
      priceRange: '价格区间',
      subwayInfo: '地铁信息',
      tags: {
        new: '新开',
        popular: '热门',
        limited: '限量',
      },
      universities: {
        tongji: '同济大学',
        fudan: '复旦大学',
        shufe: '上海财经大学',
        ecnu: '华东师范大学',
        nyu: '上海纽约大学',
        usst: '上海理工大学',
        sjtu: '上海交通大学',
        sisu: '上海外国语大学',
        ecust: '华东理工大学',
        dhu: '东华大学',
        shu: '上海大学',
        sues: '上海工程技术大学',
        shnu: '上海师范大学',
      },
    },
    lifestyle: {
      title: '哪种生活方式适合你？',
      cta: '联系我们了解更多',
    },
    food: {
      title: '品味正宗中国味道，\n就在家门口',
      subtitle: '漫步在正宗的当地餐厅和时尚咖啡馆——都在您的社区附近。',
      viewMenu: '查看菜单',
      restaurants: {
        qiantangqiuhe: {
          name: '钱塘秋荷（上海本帮菜）',
          description: '在现代环境中发现老上海的经典风味。秋荷专门制作浓郁、咸香、略带甜味的本帮菜。他们的烤鸭是必尝的，以其酥脆的皮和嫩肉而闻名。\n必尝菜品：烤鸭、红烧肉、糖醋排骨',
          cuisine: '传统上海本帮菜',
          location: '新静安中心社区',
          mustTry: '烤鸭、红烧肉、糖醋排骨'
        },
        masMuslim: {
          name: '马家清真餐厅：三代传承西北菜',
          description: '一家有着三代以上历史的家族经营餐厅。他们拥有自己的优质宁夏滩羊独家供应链，以肉质鲜嫩、味道鲜美、无膻味而闻名。\n必尝菜品：手撕宁夏羊肉、大盘鸡、羊肉串',
          cuisine: '西北菜/清真',
          location: '新静安中心社区',
          mustTry: '手撕宁夏羊肉、大盘鸡、羊肉串'
        },
        auntieFatty: {
          name: '胖姨妈：柳州螺蛳粉',
          description: '为勇敢的食客准备的大胆而令人上瘾的菜品！螺蛳粉是一种米线汤，以其辛辣、酸爽的汤底和发酵竹笋的独特香气而闻名。\n必尝菜品：招牌螺蛳粉（加个煎蛋！）、木薯糖水',
          cuisine: '广西特色',
          location: '新静安中心社区',
          mustTry: '招牌螺蛳粉、木薯糖水'
        }
      }
    },
    servicesNavigation: {
      title: '轻松畅游上海',
      subtitle: '我们帮助您安顿、连接并解锁城市生活的最佳体验。以下是我们为您提供的支持：',
      services: {
        dailyTranslation: '日常翻译协助',
        simCardRegistration: 'SIM卡注册',
        powerAdapterConversion: '电源适配器转换',
        travelGuide: '出行指南',
        sharedBikeRentals: '共享单车租赁',
        localFoodRecommendations: '当地美食推荐',
        travelItinerarySuggestions: '旅行行程建议',
        restaurantReservations: '餐厅预订',
        localAppInstallation: '本地应用安装协助',
        parcelCollectionService: '包裹代收服务',
        medicalAppointmentAssistance: '医疗预约协助',
        inHouseMaintenance: '24小时内部维护'
      }
    },
    events: {
      title: '连接、探索、共同成长',
      subtitle: '不仅仅是活动，我们编织您的上海故事。\n建立友谊，一起发现这座城市，创造充满活力的回忆，感受家的温暖。',
      learnMore: '了解更多',
      activities: {
        cocktailGathering: {
          name: '每周鸡尾酒聚会',
          description: '在我们的休息酒吧与居民朋友放松和社交。提供无酒精选择。'
        },
        foodSharingFair: {
          name: '美食分享会',
          description: '美食让我们相聚！分享家乡的味道，探索世界各地的风味。'
        },
        freshmanParty: {
          name: '新生欢迎派对',
          description: '我们的欢迎派对是您在新家的第一次温馨聚会。让我们为新开始干杯，成为一家人。'
        }
      }
    },
    testimonials: {
      title: '他们住在这里！',
      subtitle: '听听您未来邻居的真实感受。',
      reviews: {
        jules: {
          name: 'Jules',
          university: '上海大学',
          content: '我是来自上海大学的Jules。VLINKER提供了令人难以置信的价值——它比其他选择更实惠，但公寓现代而美丽。设施很棒，工作人员总是热情和乐于助人。'
        },
        emrys: {
          name: 'Emrys',
          university: '上海外国语大学',
          content: '我是Emrys，在上海外国语大学学习。作为宠物主人，我很高兴VLINKER对宠物友好。定期的活动帮助我认识来自世界各地的人，社区是美食家的天堂，从火锅到国际美食应有尽有。'
        },
        williamson: {
          name: 'Williamson',
          university: '英国',
          content: '我是来自英国的Williamson。我深深热爱中国文化，住在VLINKER是一次难忘的经历。社区活动帮助我沉浸在文化中，设施和工作人员让我感觉像真正的家。'
        }
      }
    },
    services: {
      title: '完整支持服务',
      subtitle: '我们提供全面的支持，帮助您在上海顺利安顿。从基础服务到社区活动，我们为您提供全方位服务。',
      freeWifi: '免费WiFi网络',
      translationAssistance: '日常翻译协助',
      simCardRegistration: 'SIM卡注册',
      powerAdapterConversion: '电源适配器转换',
      bankAccountOpening: '银行开户',
      insuranceConsultation: '保险咨询',
      visaExtension: '签证延期',
      jobSearchSupport: '求职支持',
      culturalEvents: '文化活动',
      communityActivities: '社区活动',
      emergencySupport: '紧急支持',
      healthCheckup: '健康体检',
      travelGuide: '出行指南',
      apartmentViewing: '看房服务',
      legalDocumentation: '法律文件',
      culturalOrientation: '文化适应',
    },
    contact: {
      title: '联系我们',
      subtitle: '有任何问题？我们随时为您服务',
      name: '姓名',
      namePlaceholder: '请输入您的姓名',
      email: '邮箱',
      emailPlaceholder: '请输入您的邮箱',
      phone: '电话',
      phonePlaceholder: '请输入您的电话',
      message: '留言',
      messagePlaceholder: '请输入您的留言',
      submit: '提交',
      submitting: '提交中...',
      success: '提交成功',
      error: '提交失败',
      successMessage: '感谢您的留言，我们会尽快回复您！',
      errorMessage: '提交失败，请稍后重试。',
      wechat: '您的微信',
      wechatPlaceholder: '请输入您的微信ID',
      university: '大学',
      universityPlaceholder: '请输入您的大学名称',
      arrivalDate: '到达日期',
      phoneSupport: '中英文支持',
      emailSupport: '24小时内回复',
      wechatSupport: '最快回复',
      followUs: '关注我们',
      rentalJourney: '您的租房之旅从这里开始。',
    },
    footer: {
      about: '关于我们',
      aboutDescription: '微领地青年社区致力于为海外学生提供优质的住宿和生活服务。',
      quickLinks: '快速链接',
      services: '服务支持',
      contact: '联系我们',
      followUs: '关注我们',
      copyright: '© 2024 微领地青年社区',
      allRightsReserved: '版权所有',
      home: '首页',
      communities: '社区介绍',
      apartments: '房型介绍',
      aboutUs: '品牌介绍',
      legalInfo: '法律信息',
      privacyPolicy: '隐私政策',
    },
    common: {
      learnMore: '了解更多',
      viewDetails: '查看详情',
      contactUs: '联系我们',
      readMore: '阅读更多',
      close: '关闭',
      loading: '加载中...',
      error: '错误',
      success: '成功',
      noImagesToDisplay: '暂无图片显示',
    },
    privacy: {
      title: '微领地企业管理集团有限公司隐私政策',
      description: '微领地企业管理集团有限公司隐私政策，说明我们如何收集、使用和分享您的个人信息。',
      lastUpdated: '最后更新',
      sections: {
        introduction: {
          title: '引言',
          content: '本隐私政策描述了当您访问 go.vlinker.com.cn（"网站"）或从网站购买商品时，我们如何收集、使用和分享您的个人信息。'
        },
        dataCollection: {
          title: '收集的个人信息类型',
          content: '当您访问网站时，我们会自动收集有关您设备的某些信息，包括有关您的网络浏览器、IP地址、时区以及安装在您设备上的某些cookie的信息。此外，当您浏览网站时，我们会收集有关您查看的各个网页或产品的信息、将您引荐到网站的网站或搜索词，以及有关您如何与网站互动的信息。我们将此自动收集的信息称为"设备信息"。',
          deviceInfo: {
            title: '设备信息',
            content: '我们使用以下技术收集设备信息：',
            technologies: {
              title: '收集技术',
              logFiles: '"日志文件"跟踪网站上发生的操作，并收集包括您的IP地址、浏览器类型、互联网服务提供商、引荐/退出页面以及日期/时间戳的数据。',
              webBeacons: '"网络信标"、"标签"和"像素"是用于记录有关您如何浏览网站信息的电子文件。'
            }
          },
          orderInfo: {
            title: '订单信息',
            content: '此外，当您通过网站进行购买或尝试进行购买时，我们会从您那里收集某些信息，包括您的姓名、账单地址、送货地址、付款信息（包括信用卡号）、电子邮件地址和电话号码。我们将此信息称为"订单信息"。'
          },
          personalInfo: {
            title: '个人信息',
            content: '当我们在本隐私政策中谈论"个人信息"时，我们既指设备信息，也指订单信息。'
          }
        },
        dataUsage: {
          title: '我们如何使用您的个人信息？',
          orderInfoUsage: {
            content: '我们通常使用收集的订单信息来履行通过网站下达的任何订单（包括处理您的付款信息、安排运输以及向您提供发票和/或订单确认）。此外，我们使用此订单信息来：',
            list: [
              '与您沟通；',
              '筛选我们的订单以发现潜在风险或欺诈；',
              '根据您与我们分享的偏好，向您提供与我们产品或服务相关的信息或广告。'
            ]
          },
          deviceInfoUsage: {
            content: '我们使用收集的设备信息来帮助我们筛选潜在风险和欺诈（特别是您的IP地址），更一般地改进和优化我们的网站（例如，通过生成有关客户如何浏览和与网站互动的分析，并评估我们营销和广告活动的成功）。'
          }
        },
        dataSharing: {
          title: '分享您的个人信息',
          content: '我们与第三方分享您的个人信息，以帮助我们使用您的个人信息，如上所述。',
          shopify: {
            content: '例如，我们使用Shopify来运营我们的在线商店——您可以在此处阅读有关Shopify如何使用您的个人信息的更多信息：',
            link: 'https://www.shopify.com/legal/privacy'
          },
          googleAnalytics: {
            content: '我们还使用Google Analytics来帮助我们了解客户如何使用网站——您可以在此处阅读有关Google如何使用您的个人信息的更多信息：',
            privacyLink: 'https://www.google.com/intl/en/policies/privacy/',
            optOutLink: 'https://tools.google.com/dlpage/gaoptout'
          },
          legalCompliance: {
            content: '最后，我们可能还会分享您的个人信息以遵守适用的法律法规、响应传票、搜查令或我们收到的其他合法信息请求，或以其他方式保护我们的权利。'
          }
        },
        behavioralAdvertising: {
          title: '行为广告',
          content: '如上所述，我们使用您的个人信息为您提供我们认为您可能感兴趣的定向广告或营销传播。有关定向广告如何工作的更多信息，您可以访问网络广告倡议（"NAI"）的教育页面：',
          optOut: {
            content: '您可以通过使用以下链接选择退出定向广告：',
            links: {
              facebook: 'Facebook',
              google: 'Google',
              bing: 'Bing'
            },
            digitalAdvertising: {
              content: '此外，您可以通过访问数字广告联盟的选择退出门户来选择退出其中一些服务：',
              link: 'http://optout.aboutads.info/'
            }
          }
        },
        doNotTrack: {
          title: '请勿跟踪',
          content: '请注意，当我们看到来自您浏览器的"请勿跟踪"信号时，我们不会改变网站的数据收集和使用做法。'
        },
        userRights: {
          title: '您的权利',
          europeanResidents: {
            content: '如果您是欧洲居民，您有权访问我们持有的关于您的个人信息，并要求更正、更新或删除您的个人信息。如果您想行使此权利，请通过下面提供的联系信息与我们联系。'
          },
          dataTransfer: {
            content: '此外，如果您是欧洲居民，我们注意到我们正在处理您的信息以履行我们可能与您签订的合同（例如，如果您通过网站下订单），或以其他方式追求我们上面列出的合法商业利益。此外，请注意您的信息将被转移到欧洲以外，包括加拿大和美国。'
          }
        },
        dataRetention: {
          title: '数据保留',
          content: '当您通过网站下订单时，我们将保留您的订单信息作为我们的记录，除非您要求我们删除此信息。'
        },
        changes: {
          title: '变更',
          content: '我们可能会不时更新此隐私政策，以反映例如我们做法的变更或其他运营、法律或监管原因。'
        },
        contact: {
          title: '联系我们',
          content: '有关我们的隐私做法的更多信息，如果您有问题，或者如果您想提出投诉，请通过电子邮件或使用下面提供的详细信息通过邮件与我们联系：',
          email: 'zhoulingxin@vlinker.com.cn',
          address: '中国上海市静安区南京西路1266号恒隆广场一期29楼'
        }
      }
    },
  },
  en: {
    navigation: {
      home: 'Home',
      about: 'Home',
      apartments: 'Apartments',
      communities: 'Communities',
      services: 'Services',
      esg: 'ESG Report',
      privacy: 'Privacy',
    },
    hero: {
      title: 'Settle in,Feel at home,\nLive fully',
      subtitle: 'More than housing - help you belong',
      cta: 'Book a Visit',
      slides: {
        slide1: {
          title: 'Settle in, Feel at home,\nLive fully',
          subtitle: 'More than housing - help you belong',
          cta: 'Explore Our Communities',
        },
        slide2: {
          title: 'Warmth of Home,\nWithout the Price Tag',
          subtitle: 'From Studios to LOFTs, Every Square Meter Offers Value',
          cta: 'Book a Visit',
        },
        slide3: {
          title: 'Complete Facilities\nQuality Life Guarantee',
          subtitle: 'Gym, yoga room, office space and more - everything you need for a rich and colorful life',
          cta: 'Book a Visit',
        },
      },
    },
    features: {
      title: 'What is Vlinker Youth Community?',
      governmentCertified: {
        title: 'Government Certified',
        description: 'Officially certified talent apartment',
      },
      designedForGenZ: {
        title: 'Designed for the Gen Z',
        description: 'A Young & Dynamic Community',
      },
      fiveCommunities: {
        title: 'Five Communities',
        description: 'Covering the core area of Shanghai',
      },
      thirtyThousandHouseholds: {
        title: '30,000+ households',
        description: 'The Trusted Choice',
      },
    },
    communities: {
      carousel: {
        slide1: {
          title: 'Exquisite Studio',
          description: 'Fashionable comfortable，comfortable,and fully functional'
        },
        slide2: {
          title: 'Super Community',
          description: 'leading a new lifestyle'
        },
        slide3: {
          title: 'Enriched Common Area',
          description: 'Hassle-free Experience'
        }
      },
      grid: {
        learnMore: 'Learn more',
        availableUnits: 'Available Units',
        unitTypes: 'Unit Types',
        communityImage: 'Community Image',
        priceRange: 'Price Range',
        perMonth: '/month',
        tags: {
          parking: 'Parking',
          gym: 'Gym',
          freeBar: 'Free Bar',
          mediaRoom: 'Media Room',
          coworkingStudySpaces: 'Co-working & Study Spaces',
          sharedKitchen: 'Shared Kitchen',
          shuttleBus: 'Shuttle Bus',
          gameRoom: 'Game Room',
          billiardsRoom: 'Billiards Room',
          communityGarden: 'Community Garden',
          basketballCourt: 'Basketball Court',
          pingPongRoom: 'Ping Pong Room',
          recordingStudio: 'Recording Studio',
          yogaRoom: 'Yoga Room'
        }
      },
      communities: {
        jinganCenter: {
          name: 'JING\'AN CENTER COMMUNITY',
          district: 'Jing\'an District',
          subwayInfo: 'Line 1 Pengpu Xincun Station 500m walk'
        },
        northHongqiao: {
          name: 'NORTH HONGQIAO COMMUNITY',
          district: 'Jiading District',
          subwayInfo: 'Line 13 Jinyun Road Station ~300m'
        },
        pujiangCenter: {
          name: 'PUJIANG CENTER COMMUNITY',
          district: 'Minhang District',
          subwayInfo: 'Line 8 Shendu Highway Station 5min direct'
        },
        hutaiRoad: {
          name: 'HUTAI ROAD COMMUNITY',
          district: 'Jing\'an District',
          subwayInfo: 'Line 7 Dachangzhen Station 200m'
        },
        pujiangPark: {
          name: 'PUJIANG PARK COMMUNITY',
          district: 'Minhang District',
          subwayInfo: 'Line 8 Shendu Highway Station 600m'
        }
      }
    },
    // 社区卡片内容
    communityCards: {
      jinganCenter: {
        title: 'Live in the fast lane\nOwn the city\'s pulse',
        tagline: 'Jing\'an Center Community',
        features: {
          joyCity: '10 mins to Joy City (Shanghai\'s Akihabara)',
          jinganTemple: '20 mins to Jing\'an Temple',
          bund: '30 mins to the Bund'
        }
      },
      northHongqiao: {
        title: 'Escape the hustle\nDiscover your weekend rhythm',
        tagline: 'North Hongqiao Community',
        features: {
          hongqiaoHub: '20 mins to Hongqiao Hub',
          highSpeedRail: 'Easy access to high-speed rail & airport',
          weekendEscapes: 'Ideal for weekend escapes'
        }
      }
    },
    communityLocation: {
      title: 'Community Locations',
      subtitle: 'Explore our five communities, each located in the core areas of Shanghai',
      commutingTitle: 'Less Time Commuting,\nMore Energy Exploring',
      commutingSubtitle: 'Less Time Commuting, More Energy Exploring',
      shuttleServiceDescription: 'Our communities are positioned near the universities in Shanghai. For added convenience, we offer exclusive shuttle services directly to campus. Just dive deeper into your studies and discover your life abroad.',
      viewDetails: 'View Details',
      availableUnits: 'Available Units',
      priceRange: 'Price Range',
      subwayInfo: 'Subway Info',
      tags: {
        new: 'New',
        popular: 'Popular',
        limited: 'Limited',
      },
      universities: {
        tongji: 'TJU',
        fudan: 'FDU',
        shufe: 'SUFE',
        ecnu: 'ECNU',
        nyu: 'NYU Shanghai',
        usst: 'USST',
        sjtu: 'SJTU',
        sisu: 'SISU',
        ecust: 'ECUST',
        dhu: 'DHU',
        shu: 'SHU',
        sues: 'SUES',
        shnu: 'SHNU',
      },
    },
    lifestyle: {
      title: 'Which lifestyle suits you?',
      cta: 'Contact Us to Learn More',
    },
    food: {
      title: 'Taste True Flavors of China,\nJust Steps Away',
      subtitle: 'Wander into authentic local eateries and trendy cafes—all right in your neighborhood.',
      viewMenu: 'View Menu',
      restaurants: {
        qiantangqiuhe: {
          name: 'The autumn lotus（Shanghai recipes）',
          description: 'Discover the classic flavors of old Shanghai in a modern setting. Qiantang Autumn Lotus specializes in rich, savory, and slightly sweet Benbang dishes. Their roast duck is a must-try, famous for its crispy skin and tender meat.\n\nMust-Try Dishes: Roast Duck, Braised Pork Belty (Hong Shao Rou), Sweet and Sour Spareribs',
          cuisine: 'Traditional Shanghainese Benbang Cuisine',
          location: 'New Jing\'an Center Community',
          mustTry: 'Roast Duck, Braised Pork Belty, Sweet and Sour Spareribs'
        },
        masMuslim: {
          name: 'Ma\'s Muslim Restaurant: Third-Generation Noodle & Lamb Specialists',
          description: 'A family-run restaurant with over three generations of history. They have their own exclusive supply chain for premium Ningxia Tan Lamb, known for being tender, flavorful, and without any gamey taste.\n\nMust-Try Dishes: Hand-Torn Ningxia Lamb, Big Plate Chicken, Lamb Skewers',
          cuisine: 'Northwest Chinese / Halal',
          location: 'New Jing\'an Center Community',
          mustTry: 'Hand-Torn Ningxia Lamb, Big Plate Chicken, Lamb Skewers'
        },
        auntieFatty: {
          name: 'Auntie Fatty\'s: Liuzhou Luosifen',
          description: 'A bold and addictive dish for the adventurous eater! Luosifen is a rice noodle soup known for its spicy, sour broth and the distinctive aroma of fermented bamboo shoots.\n\nMust-Try Dishes: Signature Luosifen (add a fried egg!), Cassava Syrup Dessert',
          cuisine: 'Guangxi Province Specialty',
          location: 'New Jing\'an Center Community',
          mustTry: 'Signature Luosifen, Cassava Syrup Dessert'
        }
      }
    },
    servicesNavigation: {
      title: 'Navigate Shanghai with Ease',
      subtitle: 'We help you settle in, connect, and unlock the best of city life. Here\'s how we support you:',
      services: {
        dailyTranslation: 'Daily Translation Assistance',
        simCardRegistration: 'SIM Card Registration',
        powerAdapterConversion: 'Power Adapter Conversion',
        travelGuide: 'Travel and Commute Guide',
        sharedBikeRentals: 'Shared Bike Rentals',
        localFoodRecommendations: 'Local Food Recommendations',
        travelItinerarySuggestions: 'Travel Itinerary Suggestions',
        restaurantReservations: 'Restaurant Reservations',
        localAppInstallation: 'Local App Installation Assistance',
        parcelCollectionService: 'Parcel Collection Service',
        medicalAppointmentAssistance: 'Medical Appointment Assistance',
        inHouseMaintenance: '24/7 In-House Maintenance'
      }
    },
    events: {
      title: 'Connecting, Exploring,\nand Thriving Together',
      subtitle: 'More than just events, we weave your Shanghai story.\nBuild friendships and discover the city together, creating vibrant memories that feel like home.',
      learnMore: 'Learn More',
      activities: {
        cocktailGathering: {
          name: 'Weekly Cocktail Gatherings',
          description: 'Relax and socialize with fellow residents in our lounge bar. Non-alcoholic options available.'
        },
        foodSharingFair: {
          name: 'Food Sharing Fair',
          description: 'Food brings us together! Share a taste of home, explore a world of flavors.'
        },
        freshmanParty: {
          name: 'Freshman Party',
          description: 'Our Welcome Party is your first warm gathering in your new home. Let\'s toast to new beginnings and become family.'
        }
      }
    },
    testimonials: {
      title: 'They Live Here!',
      subtitle: 'Get the real scoop from your future neighbors.',
      reviews: {
        jules: {
          name: 'Jules',
          university: 'Shanghai University',
          content: 'My name is Jules from Shanghai University. VLINKER offers incredible value – it\'s more affordable than other options, yet the apartments are modern and beautiful. The amenities are fantastic, and the staff are always welcoming and helpful.'
        },
        emrys: {
          name: 'Emrys',
          university: 'SISU',
          content: 'I\'m Emrys, studying at SISU. As a pet owner, I\'m thrilled that VLINKER is pet-friendly. The regular events help me meet people from all over, and the neighborhood is a foodie\'s paradise with everything from hot pot to international cuisine.'
        },
        williamson: {
          name: 'Williamson',
          university: 'UK',
          content: 'My name is Williamson from the UK. I have a deep love for Chinese culture, and living at VLINKER has been unforgettable. The community events help me immerse in the culture, and the facilities and staff make it feel like a true home.'
        }
      }
    },
    services: {
      title: 'Complete Support Services',
      subtitle: 'We provide comprehensive support to help you settle in Shanghai smoothly. From essential services to community activities, we\'ve got you covered.',
      freeWifi: 'Free WiFi Network',
      translationAssistance: 'Daily Translation Assistance',
      simCardRegistration: 'SIM Card Registration',
      powerAdapterConversion: 'Power Adapter Conversion',
      bankAccountOpening: 'Bank Account Opening',
      insuranceConsultation: 'Insurance Consultation',
      visaExtension: 'Visa Extension',
      jobSearchSupport: 'Job Search Support',
      culturalEvents: 'Cultural Events',
      communityActivities: 'Community Activities',
      emergencySupport: 'Emergency Support',
      healthCheckup: 'Health Checkup',
      travelGuide: 'Travel and Commute Guide',
      apartmentViewing: 'Apartment Viewing',
      legalDocumentation: 'Legal Documentation',
      culturalOrientation: 'Cultural Orientation',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Have any questions? We\'re here to help',
      name: 'Name',
      namePlaceholder: 'Enter your name',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      phone: 'Phone',
      phonePlaceholder: 'Enter your phone',
      message: 'Message',
      messagePlaceholder: 'Enter your message',
      submit: 'Submit',
      submitting: 'Submitting...',
      success: 'Success',
      error: 'Error',
      successMessage: 'Thank you for your message. We will get back to you soon!',
      errorMessage: 'Failed to submit. Please try again later.',
      wechat: 'Your WeChat',
      wechatPlaceholder: 'Enter your WeChat ID',
      university: 'University',
      universityPlaceholder: 'Enter your university name',
      arrivalDate: 'Arrival Date',
      phoneSupport: 'English & Chinese support',
      emailSupport: 'Response within 24 hours',
      wechatSupport: 'Quickest response',
      followUs: 'Follow Us',
      rentalJourney: 'Your Rental Journey Starts Here.',
    },
    footer: {
      about: 'About Us',
      aboutDescription: 'Vlinker Youth Community is committed to providing quality accommodation and life services for international students.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      followUs: 'Follow Us',
      copyright: '© 2024 Vlinker Youth Community',
      allRightsReserved: 'All Rights Reserved',
      home: 'Home',
      communities: 'Communities',
      apartments: 'Apartments',
      aboutUs: 'About Us',
      legalInfo: 'Legal',
      privacyPolicy: 'Privacy Policy',
    },
    common: {
      learnMore: 'Learn More',
      viewDetails: 'View Details',
      contactUs: 'Contact Us',
      readMore: 'Read More',
      close: 'Close',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      noImagesToDisplay: 'No images to display',
    },
    privacy: {
      title: 'Vlinker Management Group Co., Ltd. Privacy Policy',
      description: 'Privacy Policy of Vlinker Management Group Co., Ltd., explaining how we collect, use, and share your personal information.',
      lastUpdated: 'Last updated',
      sections: {
        introduction: {
          title: 'Introduction',
          content: 'This privacy policy describes how we collect, use, and share your personal information when you visit go.vlinker.com.cn (the "Website") or make a purchase from the Website.'
        },
        dataCollection: {
          title: 'Types of Personal Information Collected',
          content: 'When you visit the Website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Website, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Website, and information about how you interact with the Website. We refer to this automatically-collected information as "Device Information."',
          deviceInfo: {
            title: 'Device Information',
            content: 'We collect Device Information using the following technologies:',
            technologies: {
              title: 'Collection Technologies',
              logFiles: '"Log files" track actions occurring on the Website, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.',
              webBeacons: '"Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse the Website.'
            }
          },
          orderInfo: {
            title: 'Order Information',
            content: 'Additionally, when you make a purchase or attempt to make a purchase through the Website, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. We refer to this information as "Order Information."'
          },
          personalInfo: {
            title: 'Personal Information',
            content: 'When we talk about "Personal Information" in this Privacy Policy, we are talking both about Device Information and Order Information.'
          }
        },
        dataUsage: {
          title: 'How Do We Use Your Personal Information?',
          orderInfoUsage: {
            content: 'We use the Order Information that we collect generally to fulfill any orders placed through the Website (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:',
            list: [
              'Communicate with you;',
              'Screen our orders for potential risk or fraud; and',
              'When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.'
            ]
          },
          deviceInfoUsage: {
            content: 'We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Website (for example, by generating analytics about how our customers browse and interact with the Website, and to assess the success of our marketing and advertising campaigns).'
          }
        },
        dataSharing: {
          title: 'Sharing Your Personal Information',
          content: 'We share your Personal Information with third parties to help us use your Personal Information, as described above.',
          shopify: {
            content: 'For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here:',
            link: 'https://www.shopify.com/legal/privacy'
          },
          googleAnalytics: {
            content: 'We also use Google Analytics to help us understand how our customers use the Website--you can read more about how Google uses your Personal Information here:',
            privacyLink: 'https://www.google.com/intl/en/policies/privacy/',
            optOutLink: 'https://tools.google.com/dlpage/gaoptout'
          },
          legalCompliance: {
            content: 'Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.'
          }
        },
        behavioralAdvertising: {
          title: 'Behavioral Advertising',
          content: 'As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative\'s ("NAI") educational page at',
          optOut: {
            content: 'You can opt out of targeted advertising by using the links below:',
            links: {
              facebook: 'Facebook',
              google: 'Google',
              bing: 'Bing'
            },
            digitalAdvertising: {
              content: 'Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance\'s opt-out portal at:',
              link: 'http://optout.aboutads.info/'
            }
          }
        },
        doNotTrack: {
          title: 'Do Not Track',
          content: 'Please note that we do not alter our Website\'s data collection and use practices when we see a Do Not Track signal from your browser.'
        },
        userRights: {
          title: 'Your Rights',
          europeanResidents: {
            content: 'If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.'
          },
          dataTransfer: {
            content: 'Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Website), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.'
          }
        },
        dataRetention: {
          title: 'Data Retention',
          content: 'When you place an order through the Website, we will maintain your Order Information for our records unless and until you ask us to delete this information.'
        },
        changes: {
          title: 'Changes',
          content: 'We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.'
        },
        contact: {
          title: 'Contact Us',
          content: 'For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail or by mail using the details provided below:',
          email: 'zhoulingxin@vlinker.com.cn',
          address: '29th Floor, Phase 1, Plaza 66, Jing\'an District, Shanghai, China'
        }
      }
    },
  },
};

// 获取翻译文本的辅助函数
export const useTranslations = (language: 'zh' | 'en'): Translations => {
  return translations[language];
};