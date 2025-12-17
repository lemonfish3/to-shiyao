import { ContentBlock, InteractiveKeyword, Memory } from './types';

export const INTRO_QUOTES = [
  "我们认识的时间，比很多事情都久。",
  "有些关系，不靠见面维持。"
];

export const OUTRO_QUOTES = [
  "愿你继续写、继续画、继续思考。",
  "愿你在世界复杂的时候，仍然保持清晰。",
  "愿你成为你自己，也被认真对待。"
];

// Keywords that trigger subtle interactions
export const INTERACTIVE_KEYWORDS: InteractiveKeyword[] = [
  {
    word: "画画",
    responses: [
      "你每年画的生贺，我都有保存。",
      "好看，多画。",
      "之前的画完了，现在该开始画新的了。"
    ]
  },
  {
    word: "辩论",
    responses: [
      "小时候咱俩辩论，我每次都说不过你。",
      "你思考事情的方式，一直很锋利。",
      "如此高速运转的大脑进入中国。"
    ]
  },
  {
    word: "书写",
    responses: [
      "你的文字总是有一种独特的节奏。",
      "见字如面。",
      "喜欢看你写的那些诗歌和散文。"
    ]
  },
  {
    word: "生日",
    responses: [
      "从小学到大学，每年如此。",
      "这是第七个没有在你身边过的生日。",
      "又是一年冬天。"
    ]
  },
  {
    word: "距离",
    responses: [
      "中国到美国啊，好远。",
      "你啥时候来美国找我玩啊。"
    ]
  },
  {
    word: "联系",
    responses: [
      "断断续续，但从未走散。",
      "一种不需要秒回的安全感。"
    ]
  },
  {
    word: "日常",
    responses: [
      "总有一些东西想和你分享。",
      "虽然大部分都是彼此的吐槽。",
      "比如两人同时都忘带书包。"
    ]
  },
  {
    word: "大学",
    responses: [
      "复旦吗，还是太有实力了。",
      "每学期都有那么一两周",
      "可怜的大学生。"
    ]
  }
];

// Specific memories for the popup modals
export const MEMORIES: Memory[] = [
  {
    id: "m1",
    date: "2012. Summer",
    title: "海边",
    text: "前两天翻看相册找到了这张照片，小学时暑假旅行。多少年后再看，完全是不一样的心情",
    imageUrl: "beach.jpg"
  },
  {
    id: "m2",
    date: "2017. Winter",
    title: "出发",
    text: "临走时的那个拥抱。那时觉得分开是很遥远的事，没想到后来变成了常态。",
    imageUrl: "last-photo.jpeg"
  },
  {
    id: "m3",
    date: "2019. Birthday",
    title: "礼物",
    text: "每年的生日，都会收到不一样的惊喜。还记得我十八岁生日，你找到小学的朋友给我写祝福。那一刻觉得，物理距离其实没那么可怕。",
    imageUrl: "birthday.png"
  }
];

// The narrative sections that will be shuffled
export const MIDDLE_SECTIONS_POOL: ContentBlock[] = [
  {
    id: "distance",
    title: "后来我们不在同一个地方",
    content: "初中你还在北京的时候，我已经开始用另一种时区生活。距离变远了，但你没有变成“过去的人”。虽然我们都在各自忙碌，你在上海忙着学业和社团，我在地球另一端，但联系从未断开。"
  },
  {
    id: "connection",
    title: "消息一直在",
    content: "我们会聊很日常的事情。学业、状态、心情、一些无关紧要的小事。生活上的各种压力和焦虑，偶尔的情感问题和八卦，以及每年从来没有断过的生日祝福。正是这些小事，让时间没有断开。"
  },
  {
    id: "growth",
    title: "各自生长",
    content: "看着你从那个活泼开朗，很会画画的小学同学，变成现在的辩论队主力。错过的这些年我们会有新的社交圈，新的爱好和新的习惯。虽然我们都在变，但这种变化没有让我们生疏，反而让我们成了彼此成长的见证者。"
  }
];

export const LETTER_CONTENT = {
  title: "致 诗瑶",
  description: "没什么可以给你的，只好写点什么，画点什么。",
  imageUrls: [
    "cover.jpg",
    "letter.jpg"
  ]
};

export const FINAL_SECTION: ContentBlock = {
  id: "now",
  title: "现在",
  content: "现在我们都在大学里，在各自的轨道上变得更完整。你会继续观察这个世界，继续书写人生。但你仍然是我生活里，一个稳定、确定的存在。"
};