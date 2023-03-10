let instance = null;
class Singleton {
	constructor() {
		this.value = Math.random();
	}
	printValue() {
		console.log(this.value);
	}
	static getInstance() {
		if (!instance) {
			instance = new Singleton();
		}
		return instance;
	}
}

let a = Singleton.getInstance();

let b = Singleton.getInstance();

console.log(a);
console.log(b);

// class MyClass {
// 	constructor() {
// 		if (MyClass._instance) {
// 			return MyClass._instance;
// 		}
// 		MyClass._instance = this;

// 		// ... Your rest of the constructor code goes after this
// 	}
// }

// var instanceOne = new MyClass();
// var instanceTwo = new MyClass();

// console.log(instanceOne === instanceTwo); // Logs "true"

// class Database {
//     static instance = null;

//     constructor() {
//         mongoose.set('strictQuery', false)
//         mongoose.connect("tu url")
//             .then(() => logger.log('info', "✅ DB ON"))
//             .catch(e => logger.log('error', ` ❌ DB OFF ${e}`));
//     }
//     static getInstance() {
//         if (!Database.instance) {
//             Database.instance = new Database();
//         }
//         return Database.instance;
//     }
// }

// Database.getInstance();
// ese es el singleton :P
