const studentList =
[
	{
		name: "Ha",
		gender: 'female',
		score: 8
	},
	{
		name: "Huy",
		gender: 'male',
		score: 9
	},
	{
		name: "Hung",
		gender: 'male',
		score: 7
	},
	{
		name: "Phuong",
		gender: 'female',
		score: 6
	},
	{
		name: "Huyen",
		gender: 'female',
		score: 10
	},
	{
		name: "Long",
		gender: 'male',
		score: 5
	},
	{
		name: "Luan",
		gender: 'male',
		score: 10
	},
	{
		name: "Linh",
		gender: 'female',
		score: 8
	}
];

const maleList = studentList.filter(student => student.gender == 'male');

const femaleList = studentList.filter(student => student.gender == 'female');

const totalScoreMale = maleList.reduce((previousValue, currentValue) => previousValue + currentValue.score, 0 )

const totalScoreFemale = femaleList.reduce((previousValue, currentValue) => previousValue + currentValue.score, 0 )

const averageScoreMale = totalScoreMale / maleList.length;
console.log('Điểm trung bình các bạn nam là', averageScoreMale);

const averageScoreFemale = totalScoreFemale / femaleList.length;
console.log('Điểm trung bình các bạn nữ là', averageScoreFemale);


