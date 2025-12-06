# Admin Portal - Ekushey Coding Platform

## Overview
Complete admin dashboard for managing blog content with full CRUD operations, authentication, and bilingual support.

## Admin Access
- **URL**: https://w3u.vercel.app/admin/login
- **Demo Credentials**:
  - Email: `admin@ekusheycoding.com`
  - Password: `admin123`

## Features Implemented

### 1. Authentication System ✅
- **Login Page** (`/admin/login`)
  - Email/password authentication
  - Token stored in localStorage
  - Auto-redirect if already logged in
  - Role-based access control
  
- **Auth Guard Middleware**
  - Protects all admin routes
  - Validates token and admin role
  - Auto-redirect to login if unauthorized

### 2. Admin Dashboard ✅
- **URL**: `/admin/dashboard`
- **Features**:
  - Real-time statistics (total blogs, published, drafts, views)
  - Category distribution with counts
  - Recent blogs list (last 5)
  - Quick action cards
  - Visual stats with color-coded cards

### 3. Blog List Management ✅
- **URL**: `/admin/blogs`
- **Features**:
  - Paginated table view (15 per page)
  - Search functionality (titles/content)
  - Multiple filters:
    - Status (all/published/draft)
    - Category
    - Author
  - Sorting options:
    - Date (newest/oldest)
    - Title (A-Z/Z-A)
    - Views (high/low)
  - Bulk actions:
    - Select all/individual blogs
    - Bulk delete
    - Bulk status change (publish/draft)
  - Per-row actions:
    - View (opens public blog page)
    - Edit (goes to edit page)
    - Delete (with confirmation)
  - Displays: ID, title (EN/BN), category, status, author, views, date

### 4. Create Blog ✅
- **URL**: `/admin/blogs/new`
- **Features**:
  - Bilingual form fields (English & Bengali):
    - Title
    - Excerpt
    - Content (large textarea)
    - Category
    - Author
    - Tags (multi-tag with add/remove)
    - Read time
  - Additional fields:
    - Status (draft/published radio buttons)
    - Slug (auto-generated from English title)
    - Featured image URL
    - Published date picker
  - Real-time slug generation
  - Tag management with chips
  - Form validation
  - Success redirect to blog list

### 5. Edit Blog ✅
- **URL**: `/admin/blogs/edit/[id]`
- **Features**:
  - Pre-filled form with existing data
  - Same fields as create
  - Delete button with confirmation
  - Update functionality
  - Loading states
  - Error handling

### 6. Reusable Components ✅

#### StatsCard
- Color-coded statistics display
- Icon support
- Trend indicators (optional)
- Hover animations

#### AdminLayout
- Responsive sidebar navigation
- Mobile-friendly (collapsible menu)
- User info display
- Logout functionality
- Top navigation bar
- Active route highlighting

#### BlogForm
- Bilingual input fields
- Tag management
- Auto-slug generation
- Status toggle
- Date picker
- Rich validation
- Loading states

#### AdminAuthGuard
- Route protection
- Authentication check
- Role verification
- Auto-redirect

#### ToastProvider
- Success/Error/Info/Warning toasts
- Auto-dismiss (5 seconds)
- Manual close
- Stackable notifications
- Color-coded by type

### 7. API Integration ✅

#### Auth API (`/lib/auth.ts`)
- `adminLogin()` - Authenticate admin
- `adminLogout()` - Clear session
- `getAdminUser()` - Get current user
- `isAdminAuthenticated()` - Check auth status
- `isAdmin()` - Check admin role
- `getAdminToken()` - Get auth token

#### Admin API (`/lib/api/admin.ts`)
- `getAdminStats()` - Dashboard statistics
- `getAdminBlogs()` - Paginated blog list with filters
- `getAdminBlog(id)` - Single blog details
- `createBlog(data)` - Create new blog
- `updateBlog(id, data)` - Update existing blog
- `deleteBlog(id)` - Delete blog
- `bulkDeleteBlogs(ids)` - Delete multiple blogs
- `bulkUpdateStatus(ids, status)` - Update status for multiple
- `generateSlug(title)` - Auto-generate URL slug

### 8. Technical Features ✅

- **State Management**: React useState/useEffect hooks
- **Styling**: Tailwind CSS with dark theme
- **Routing**: Next.js 15 App Router
- **Type Safety**: TypeScript throughout
- **Error Handling**: Try-catch with user-friendly messages
- **Loading States**: Spinners and disabled states
- **Responsive Design**: Mobile-first approach
- **Toast Notifications**: Context API based
- **Form Validation**: Client-side validation
- **Confirmation Dialogs**: Before destructive actions
- **Auto-redirect**: After actions (create/update/delete)
- **Token Management**: localStorage with auto-headers

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx                 # Admin login page
│   │   ├── dashboard/
│   │   │   └── page.tsx                 # Dashboard with stats
│   │   └── blogs/
│   │       ├── page.tsx                 # Blog list page
│   │       ├── new/
│   │       │   └── page.tsx             # Create blog page
│   │       └── edit/
│   │           └── [id]/
│   │               └── page.tsx         # Edit blog page
│   └── layout.tsx                       # Root layout (includes ToastProvider)
│
├── Components/
│   ├── Admin/
│   │   ├── AdminAuthGuard.tsx           # Route protection
│   │   ├── AdminLayout.tsx              # Admin page layout
│   │   ├── StatsCard.tsx                # Statistics display card
│   │   └── BlogForm.tsx                 # Blog create/edit form
│   └── Providers/
│       └── ToastProvider.tsx            # Toast notification system
│
└── lib/
    ├── auth.ts                          # Authentication utilities
    └── api/
        └── admin.ts                     # Admin API functions
```

## Usage Guide

### 1. Login
1. Navigate to `/admin/login`
2. Enter credentials
3. Click "Sign In"
4. Redirected to dashboard

### 2. View Dashboard
- See total blogs, published count, drafts, and views
- Browse categories and their post counts
- View recent blogs
- Access quick actions

### 3. Manage Blogs
1. Click "All Blogs" in sidebar
2. Use search/filters to find blogs
3. Sort by date/title/views
4. Select multiple blogs for bulk actions
5. Click actions (view/edit/delete) per blog

### 4. Create New Blog
1. Click "New Blog" in sidebar or dashboard
2. Fill in all fields (English & Bengali)
3. Add tags
4. Choose status (draft/published)
5. Click "Create Blog"
6. Redirected to blog list

### 5. Edit Blog
1. Go to blog list
2. Click edit icon on a blog
3. Update fields as needed
4. Click "Update Blog"
5. Or click "Delete Blog" to remove

### 6. Bulk Operations
1. Select multiple blogs using checkboxes
2. Choose bulk action:
   - Publish Selected
   - Draft Selected
   - Delete Selected
3. Confirm action
4. Changes applied immediately

## API Endpoints Used

- `POST /admin/login` - Admin authentication
- `GET /admin/blogs/stats` - Dashboard statistics
- `GET /admin/blogs` - List blogs (with filters/pagination)
- `GET /admin/blogs/{id}` - Get single blog
- `POST /admin/blogs` - Create blog
- `PUT /admin/blogs/{id}` - Update blog
- `DELETE /admin/blogs/{id}` - Delete blog
- `POST /admin/blogs/bulk-delete` - Delete multiple
- `POST /admin/blogs/bulk-status` - Update status for multiple

## Error Handling

- **401 Unauthorized**: Redirects to login
- **403 Forbidden**: Shows access denied
- **404 Not Found**: Shows not found message
- **422 Validation Error**: Shows validation message
- **Network Error**: Shows connection error
- All errors display user-friendly toast notifications

## Security Features

- Token-based authentication
- Role-based access control
- Protected routes with auth guard
- Secure token storage
- Auto-logout on token expiration
- Confirmation before destructive actions

## Responsive Design

- Mobile-first approach
- Collapsible sidebar on mobile
- Responsive tables (horizontal scroll)
- Touch-friendly buttons
- Adaptive grid layouts
- Mobile-optimized forms

## Future Enhancements (Nice to Have)

- [ ] Rich text editor (TinyMCE/Quill)
- [ ] Image upload functionality
- [ ] Draft auto-save
- [ ] Blog preview before publish
- [ ] Export blogs to CSV
- [ ] Activity log
- [ ] User management section
- [ ] Dark mode toggle
- [ ] Analytics dashboard
- [ ] Comment moderation

## Testing Checklist

- [x] Login with valid credentials
- [x] Login with invalid credentials
- [x] Dashboard loads stats correctly
- [x] Blog list displays with pagination
- [x] Search functionality works
- [x] Filters apply correctly
- [x] Sorting works
- [x] Create new blog
- [x] Edit existing blog
- [x] Delete blog with confirmation
- [x] Bulk delete
- [x] Bulk status change
- [x] Toast notifications appear
- [x] Mobile responsive design
- [x] Auth guard protects routes
- [x] Logout functionality

## Support

For issues or questions:
- Check browser console for errors
- Verify backend API is running
- Check network tab for failed requests
- Ensure localStorage is enabled
- Clear cache and reload

## Notes

- All admin pages require authentication
- Changes are saved immediately to backend
- Logout clears all session data
- Bilingual support for Bengali and English
- Auto-generated slugs from English titles
- Published date defaults to current time if not set
