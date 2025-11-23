# Portfolio Personnel

Portfolio moderne pour développeur, construit avec Next.js 14 (App Router), Tailwind CSS et Lucide Icons.

## 🚀 Fonctionnalités

- **Hero Section** : Photo de profil, titre accrocheur et liens sociaux
- **Section Projets** : Grille de cartes présentant vos projets
- **Section Compétences** : Affichage organisé de vos compétences techniques
- **Formulaire de Contact** : Formulaire simple pour recevoir des messages
- **Design Minimaliste** : Mode sombre par défaut, typographie sans-serif moderne

## 🛠️ Technologies

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons

## 📦 Installation

1. Installez les dépendances :
```bash
npm install
```

2. Lancez le serveur de développement :
```bash
npm run dev
```

3. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📝 Configuration

### Images

Ajoutez vos images dans le dossier `public` :
- `profile.jpg` : Photo de profil pour la section Hero
- `project1.jpg`, `project2.jpg`, etc. : Images pour les projets

### Personnalisation

1. **Hero Section** : Modifiez `components/Hero.tsx` pour mettre à jour :
   - Les liens sociaux
   - Le titre et la description

2. **Projets** : Modifiez le tableau `projects` dans `components/Projects.tsx`

3. **Compétences** : Modifiez le tableau `skillCategories` dans `components/Skills.tsx`

4. **Contact** : Modifiez les informations de contact dans `components/Contact.tsx`

## 🎨 Personnalisation du Design

Le design utilise Tailwind CSS. Vous pouvez modifier les couleurs et styles dans :
- `app/globals.css` : Styles globaux
- `tailwind.config.js` : Configuration Tailwind

## 📄 Scripts

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm run start` : Lance le serveur de production
- `npm run lint` : Lance le linter

## 🚢 Déploiement

Le projet peut être déployé sur Vercel, Netlify ou tout autre hébergeur supportant Next.js.

Pour Vercel :
```bash
npm install -g vercel
vercel
```



