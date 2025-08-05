# Prosty projekt z bazą danych

Prosty projekt Node.js z integracją bazy danych SQL Server, wykorzystujący TypeScript i TypeORM.

## 🚀 Szybki start

### Wymagania

- Node.js 18+
- SQL Server (lokalny lub zdalny)

### Instalacja

1. Zainstaluj zależności:
```bash
npm install
```

2. Skonfiguruj zmienne środowiskowe (opcjonalnie):
```bash
# Baza danych
export DB_HOST=localhost
export DB_PORT=1433
export DB_NAME=OPCUADataManagement
export DB_USER=sa
export DB_PASSWORD=YourStrong@Passw0rd
```

3. Uruchom bazę danych:
```bash
# Uruchom SQL Server przez Docker
docker-compose up -d
```

4. Uruchom aplikację:
```bash
# Tryb deweloperski
npm run dev

# Tryb produkcyjny
npm run build
npm start
```

**Uwaga:** Aplikacja automatycznie utworzy bazę danych `OPC-DATA` i tabelę `test` podczas pierwszego uruchomienia!

## 📁 Struktura projektu

```
├── src/
│   ├── index.ts              # Główny plik aplikacji
│   ├── config.ts             # Konfiguracja aplikacji
│   └── database/
│       ├── database.ts       # Klasa zarządzająca bazą danych
│       ├── schema.ts         # Definicje typów bazy danych
│       ├── init.ts           # Automatyczna inicjalizacja bazy danych
│       └── seed.ts           # Skrypt wypełniający bazę danych
├── database/
│   └── schema.sql            # Skrypt tworzący strukturę bazy danych
├── package.json
├── tsconfig.json
├── .eslintrc.js
└── .prettierrc
```

## 🗄️ Struktura bazy danych

### Baza danych: OPC-DATA

### Tabela test

| Kolumna | Typ | Opis |
|---------|-----|------|
| id | INT | Klucz główny (auto-increment) |
| firstname | NVARCHAR(100) | Imię |
| lastname | NVARCHAR(100) | Nazwisko |
| created_at | DATETIME2 | Data utworzenia rekordu |

## 🛠️ Skrypty npm

- `npm run dev` - Uruchom w trybie deweloperskim
- `npm run build` - Kompiluj TypeScript
- `npm start` - Uruchom skompilowaną aplikację
- `npm run lint` - Sprawdź kod ESLint
- `npm run lint:fix` - Napraw błędy ESLint
- `npm run format` - Sformatuj kod Prettier
- `npm run db:seed` - Wypełnij bazę danych przykładowymi danymi

## 🔧 Konfiguracja

### Baza danych

Domyślne ustawienia SQL Server:
- Host: `localhost`
- Port: `1433`
- Database: `OPC-DATA`
- Username: `sa`
- Password: `YourStrong@Passw0rd`

## 📝 Przykład użycia

```typescript
import { Database } from './src/database/database';

// Połączenie z bazą danych
const db = new Database();
await db.connect();

// Dodanie nowej osoby
const dataSource = db.getDb();
await dataSource.query(`
  INSERT INTO test (firstname, lastname) 
  VALUES ('Jan', 'Kowalski')
`);

// Pobranie wszystkich osób
const allPeople = await dataSource.query(`
  SELECT * FROM test
`);

console.log('Wszystkie osoby:', allPeople);
```

## 🗄️ GUI - Adminer

Aplikacja zawiera wbudowany GUI do zarządzania bazą danych:

1. **Uruchom:** `docker-compose up -d`
2. **Otwórz:** `http://localhost:8081`
3. **Połącz się:**
   - System: `MS SQL`
   - Server: `sqlserver`
   - Username: `sa`
   - Password: `YourStrong@Passw0rd`
   - Database: `OPC-DATA`

## 🐛 Rozwiązywanie problemów

### Błąd połączenia z bazą danych
- Sprawdź czy SQL Server jest uruchomiony: `docker-compose ps`
- Zweryfikuj dane logowania w `config.ts`
- Sprawdź logi: `docker-compose logs sqlserver`

### Automatyczne tworzenie bazy danych
- Aplikacja automatycznie utworzy bazę `OPC-DATA` przy pierwszym uruchomieniu
- Jeśli baza już istnieje, aplikacja połączy się z nią
- Tabela `test` zostanie utworzona automatycznie

## 📄 Licencja

MIT 

# OPC Database Project

## Konfiguracja Standalone NodeId

### Jak dodać pojedyncze nodeId

Aby dodać pojedyncze nodeId, które nie należą do żadnej kategorii (traverseData ani traverseLoc), edytuj plik `src/node-ids.ts`:

```typescript
export const STANDALONE_NODE_IDS: StandaloneNodeConfig[] = [
  {
    nodeId: 'ns=3;s="DB_OPC"."System_Status"',
    tableName: 'SystemStatus',
    description: 'Status systemu'
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."Alarm_Status"',
    tableName: 'AlarmStatus', 
    description: 'Status alarmów'
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."Temperature_Sensor"',
    tableName: 'TemperatureSensor',
    description: 'Czujnik temperatury'
  },
];
```

### Struktura konfiguracji

Każdy standalone nodeId wymaga:
- `nodeId`: Pełny identyfikator nodeId z OPC
- `tableName`: Nazwa tabeli w bazie danych (bez spacji, używaj CamelCase)
- `description`: Opis nodeId (opcjonalny, dla dokumentacji)

### Przykłady użycia

1. **Dodanie nowego standalone nodeId:**
   ```typescript
   {
     nodeId: 'ns=3;s="DB_OPC"."Your_Custom_Node"',
     tableName: 'YourCustomNode',
     description: 'Opis twojego nodeId'
   }
   ```

2. **NodeId z różnymi namespace:**
   ```typescript
   {
     nodeId: 'ns=2;s="Custom_Namespace"."Custom_Node"',
     tableName: 'CustomNode',
     description: 'Node z custom namespace'
   }
   ```

### Bezpieczeństwo

- System automatycznie sprawdza czy nodeId nie koliduje z istniejącymi kategoriami
- Nazwy tabel są automatycznie czyszczone z niebezpiecznych znaków
- Fallback nazwa tabeli jest generowana jeśli konfiguracja nie istnieje

### Logowanie

Standalone nodeId są logowane podczas przetwarzania z informacją o nazwie tabeli i opisie. 