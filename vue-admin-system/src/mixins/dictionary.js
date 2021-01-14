//时间选择器
export const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近半年',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 182);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一年',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
      picker.$emit('pick', [start, end]);
    }
  }]
}

// 操作类型
export const ACTION = {
  ADD: '1',
  EDIT: '2',
  REVIEW: '3',
};

//题型
export const questionType = [
  {
    label: '选择题',
    value: '1',
  },
  {
    label: '判断题',
    value: '2',
  },
];

//人员类型
export const userType = [
  {
    label: '卫生管理员',
    value: '1',
  },
  {
    label: '从业人员',
    value: '2',
  },
];

//培训类型
export const trainType = [
  {
    label: '文档培训',
    value: '1',
  },
  {
    label: '视频培训',
    value: '2',
  },
];

//培训内容
export const trainContent = [
  {
    label: '手动输入',
    value: '1',
  },
  {
    label: '上传文件',
    value: '2',
  },
];

// 月份
export const monthMap = [{
  name: "1月",
  code: 1
},
  {
    name: "2月",
    code: 2
  },
  {
    name: "3月",
    code: 3
  },
  {
    name: "4月",
    code: 4
  },
  {
    name: "5月",
    code: 5
  },
  {
    name: "6月",
    code: 6
  },
  {
    name: "7月",
    code: 7
  },
  {
    name: "8月",
    code: 8
  },
  {
    name: "9月",
    code: 9
  },
  {
    name: "10月",
    code: 10
  },
  {
    name: "11月",
    code: 11
  },
  {
    name: "12月",
    code: 12
  }
];

//用户状态
export const userStatus = [
  {
    label: '待审核',
    value: 1,
  },
  {
    label: '审核通过',
    value: 2,
  },
  {
    label: '审核不通过',
    value: 3,
  },
];
