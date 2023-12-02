export interface Technique {
    id: number;
    name: string;
}

export interface Category {
    name: string;
    techniques: Technique[];
}

export interface TechniquesData {
    c1: Category;
    c2: Category;
    c3: Category;
    c4: Category;
    c5: Category;
}

const techniquesData: TechniquesData = {
    c1: {
        name: "더 빠른 연산",
        techniques: [
            { id: 1, name: "Backtracking 줄이기" },
            { id: 2, name: "String 내장함수 사용" },
            { id: 3, name: "System.arraycopy" },
            { id: 6, name: "LinkedList 반복문" },
            { id: 16, name: "Mathematical Formula" },
            { id: 28, name: "Bitwise 연산" },
            { id: 30, name: "EntrySet 사용" },
        ],
    },
    c2: {
        name: "컴파일 최적화",
        techniques: [
            { id: 23, name: "Inline Method" },
            { id: 24, name: "static 줄이기" },
            { id: 26, name: "Casting 줄이기" },
        ],
    },
    c3: {
        name: "코딩 스타일",
        techniques: [
            { id: 4, name: "Exception Throw" },
            { id: 5, name: "배열 미리 할당하기" },
            { id: 7, name: "IntStream" },
            { id: 13, name: "생성자 단계 초기화" },
            { id: 14, name: "반복문 condition 연산 줄이기" },
            { id: 15, name: "Log 사용 최소화" },
            { id: 19, name: "불필요한 오브젝트 생성" },
            { id: 21, name: "불필요한 reflection" },
            { id: 27, name: "불필요한 변수 선언" },
            { id: 29, name: "Logging with Lambda function" },
        ],
    },
    c4: {
        name: "쓰레드 동기화",
        techniques: [
            { id: 20, name: "벡터 synchronization overhead" },
            { id: 25, name: "동기화 지양" },
        ],
    },
    c5: {
        name: "Java 객체",
        techniques: [
            { id: 8, name: "User Input" },
            { id: 9, name: "StringBuffer" },
            { id: 10, name: "StringTokenizer" },
            { id: 11, name: "Tree Map vs. Hash Map" },
            { id: 12, name: "StringBuilder" },
            { id: 17, name: "병렬 스트림 사용" },
            { id: 18, name: "정적 배열 사용" },
            { id: 22, name: "객체 재사용" },
            { id: 31, name: "EnumSet" },
        ],
    },
};

export default techniquesData;
