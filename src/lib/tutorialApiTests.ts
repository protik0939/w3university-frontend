/**
 * Tutorial API Test Examples
 * 
 * This file demonstrates how to use the tutorial API functions.
 * Copy these examples into your browser console or component code.
 */

import { tutorialAPI } from '@/lib/tutorialApi'

// ============================================
// 1. CREATE TUTORIAL
// ============================================
export async function testCreateTutorial() {
  const authToken = localStorage.getItem('admin_token')
  if (!authToken) {
    console.error('❌ No admin token found. Please login first.')
    return
  }

  try {
    const newTutorial = {
      language_id: 'javascript',
      title: 'Introduction to JavaScript Variables',
      content: 'Variables are containers for storing data values. In JavaScript, you can declare variables using var, let, or const keywords.',
      code_example: `// Example of variable declaration
let name = "John";
const age = 30;
var city = "New York";

console.log(name, age, city);`,
      order: 1,
      is_published: true
    }

    const response = await tutorialAPI.adminCreate(newTutorial, authToken)
    console.log('✅ Tutorial created successfully:', response)
    return response
  } catch (error) {
    console.error('❌ Failed to create tutorial:', error)
  }
}

// ============================================
// 2. GET ALL TUTORIALS (Admin)
// ============================================
export async function testGetAllTutorials() {
  const authToken = localStorage.getItem('admin_token')
  if (!authToken) {
    console.error('❌ No admin token found. Please login first.')
    return
  }

  try {
    const tutorials = await tutorialAPI.adminGetAll({}, authToken)
    console.log(`✅ Retrieved ${tutorials.length} tutorials:`, tutorials)
    return tutorials
  } catch (error) {
    console.error('❌ Failed to get tutorials:', error)
  }
}

// ============================================
// 3. GET TUTORIALS BY LANGUAGE
// ============================================
export async function testGetTutorialsByLanguage() {
  const authToken = localStorage.getItem('admin_token')
  if (!authToken) {
    console.error('❌ No admin token found. Please login first.')
    return
  }

  try {
    const tutorials = await tutorialAPI.adminGetAll({ 
      language_id: 'javascript' 
    }, authToken)
    console.log(`✅ Retrieved ${tutorials.length} JavaScript tutorials:`, tutorials)
    return tutorials
  } catch (error) {
    console.error('❌ Failed to get tutorials by language:', error)
  }
}

// ============================================
// 4. SEARCH TUTORIALS
// ============================================
export async function testSearchTutorials(searchTerm: string) {
  const authToken = localStorage.getItem('admin_token')
  if (!authToken) {
    console.error('❌ No admin token found. Please login first.')
    return
  }

  try {
    const tutorials = await tutorialAPI.adminGetAll({ 
      search: searchTerm 
    }, authToken)
    console.log(`✅ Search results for "${searchTerm}":`, tutorials)
    return tutorials
  } catch (error) {
    console.error('❌ Failed to search tutorials:', error)
  }
}

// ============================================
// 5. GET SINGLE TUTORIAL
// ============================================
export async function testGetSingleTutorial(tutorialId: number) {
  try {
    const tutorial = await tutorialAPI.getById(tutorialId)
    console.log('✅ Retrieved tutorial:', tutorial)
    return tutorial
  } catch (error) {
    console.error('❌ Failed to get tutorial:', error)
  }
}

// ============================================
// 6. UPDATE TUTORIAL
// ============================================
export async function testUpdateTutorial(tutorialId: number) {
  const authToken = localStorage.getItem('admin_token')
  if (!authToken) {
    console.error('❌ No admin token found. Please login first.')
    return
  }

  try {
    const updates = {
      title: 'Updated: Introduction to JavaScript Variables',
      content: 'Updated content about JavaScript variables...',
      is_published: true
    }

    const response = await tutorialAPI.adminUpdate(tutorialId, updates, authToken)
    console.log('✅ Tutorial updated successfully:', response)
    return response
  } catch (error) {
    console.error('❌ Failed to update tutorial:', error)
  }
}

// ============================================
// 7. TOGGLE PUBLISH STATUS
// ============================================
export async function testTogglePublishStatus(tutorialId: number, currentStatus: boolean) {
  const authToken = localStorage.getItem('admin_token')
  if (!authToken) {
    console.error('❌ No admin token found. Please login first.')
    return
  }

  try {
    const response = await tutorialAPI.adminUpdate(
      tutorialId,
      { is_published: !currentStatus },
      authToken
    )
    console.log(`✅ Tutorial ${!currentStatus ? 'published' : 'unpublished'} successfully:`, response)
    return response
  } catch (error) {
    console.error('❌ Failed to toggle publish status:', error)
  }
}

// ============================================
// 8. DELETE TUTORIAL
// ============================================
export async function testDeleteTutorial(tutorialId: number) {
  const authToken = localStorage.getItem('admin_token')
  if (!authToken) {
    console.error('❌ No admin token found. Please login first.')
    return
  }

  const confirmed = confirm(`Are you sure you want to delete tutorial #${tutorialId}?`)
  if (!confirmed) {
    console.log('❌ Deletion cancelled')
    return
  }

  try {
    const response = await tutorialAPI.adminDelete(tutorialId, authToken)
    console.log('✅ Tutorial deleted successfully:', response)
    return response
  } catch (error) {
    console.error('❌ Failed to delete tutorial:', error)
  }
}

// ============================================
// 9. BULK DELETE TUTORIALS
// ============================================
export async function testBulkDeleteTutorials(tutorialIds: number[]) {
  const authToken = localStorage.getItem('admin_token')
  if (!authToken) {
    console.error('❌ No admin token found. Please login first.')
    return
  }

  const confirmed = confirm(`Are you sure you want to delete ${tutorialIds.length} tutorials?`)
  if (!confirmed) {
    console.log('❌ Bulk deletion cancelled')
    return
  }

  try {
    const response = await tutorialAPI.adminBulkDelete(tutorialIds, authToken)
    console.log('✅ Tutorials deleted successfully:', response)
    return response
  } catch (error) {
    console.error('❌ Failed to bulk delete tutorials:', error)
  }
}

// ============================================
// 10. BULK UPDATE STATUS
// ============================================
export async function testBulkUpdateStatus(tutorialIds: number[], isPublished: boolean) {
  const authToken = localStorage.getItem('admin_token')
  if (!authToken) {
    console.error('❌ No admin token found. Please login first.')
    return
  }

  try {
    const response = await tutorialAPI.adminBulkUpdateStatus(tutorialIds, isPublished, authToken)
    console.log(`✅ Tutorials ${isPublished ? 'published' : 'unpublished'} successfully:`, response)
    return response
  } catch (error) {
    console.error('❌ Failed to bulk update status:', error)
  }
}

// ============================================
// COMPLETE WORKFLOW TEST
// ============================================
export async function testCompleteWorkflow() {
  console.log('🚀 Starting complete CRUD workflow test...\n')

  // 1. Create
  console.log('📝 Step 1: Creating tutorial...')
  const created = await testCreateTutorial()
  if (!created || !created.tutorial) {
    console.error('❌ Workflow failed at create step')
    return
  }
  const tutorialId = created.tutorial.id

  // Wait a bit
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 2. Read
  console.log('\n📖 Step 2: Reading tutorial...')
  await testGetSingleTutorial(tutorialId)

  // Wait a bit
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 3. Update
  console.log('\n✏️ Step 3: Updating tutorial...')
  await testUpdateTutorial(tutorialId)

  // Wait a bit
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 4. Toggle status
  console.log('\n🔄 Step 4: Toggling publish status...')
  await testTogglePublishStatus(tutorialId, true)

  // Wait a bit
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 5. List all
  console.log('\n📋 Step 5: Listing all tutorials...')
  await testGetAllTutorials()

  // Wait a bit
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 6. Search
  console.log('\n🔍 Step 6: Searching tutorials...')
  await testSearchTutorials('JavaScript')

  // Wait a bit
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 7. Delete
  console.log('\n🗑️ Step 7: Deleting tutorial...')
  await testDeleteTutorial(tutorialId)

  console.log('\n✅ Complete workflow test finished!')
}

// ============================================
// USAGE EXAMPLES IN BROWSER CONSOLE
// ============================================

/**
 * TO TEST IN BROWSER CONSOLE:
 * 
 * 1. Make sure you're logged in as admin
 * 2. Open browser console (F12)
 * 3. Copy and run individual tests:
 * 
 * // Test creating a tutorial
 * testCreateTutorial()
 * 
 * // Test getting all tutorials
 * testGetAllTutorials()
 * 
 * // Test getting tutorials by language
 * testGetTutorialsByLanguage()
 * 
 * // Test searching
 * testSearchTutorials('variable')
 * 
 * // Test getting single tutorial (replace 1 with actual ID)
 * testGetSingleTutorial(1)
 * 
 * // Test updating (replace 1 with actual ID)
 * testUpdateTutorial(1)
 * 
 * // Test toggling publish status (replace 1 with actual ID)
 * testTogglePublishStatus(1, true)
 * 
 * // Test deleting (replace 1 with actual ID)
 * testDeleteTutorial(1)
 * 
 * // Test bulk delete (replace IDs with actual IDs)
 * testBulkDeleteTutorials([1, 2, 3])
 * 
 * // Test bulk update status (replace IDs with actual IDs)
 * testBulkUpdateStatus([1, 2, 3], true)
 * 
 * // Run complete workflow
 * testCompleteWorkflow()
 */

// ============================================
// SAMPLE DATA
// ============================================

export const sampleTutorials = [
  {
    language_id: 'javascript',
    title: 'JavaScript Variables',
    content: 'Learn about var, let, and const',
    code_example: 'let x = 10;\nconst y = 20;',
    order: 1,
    is_published: true
  },
  {
    language_id: 'python',
    title: 'Python Data Types',
    content: 'Understanding Python data types',
    code_example: 'x = 10\ny = "Hello"',
    order: 1,
    is_published: true
  },
  {
    language_id: 'html',
    title: 'HTML Basics',
    content: 'Introduction to HTML elements',
    code_example: '<h1>Hello World</h1>',
    order: 1,
    is_published: true
  }
]

const tutorialApiTests = {
  testCreateTutorial,
  testGetAllTutorials,
  testGetTutorialsByLanguage,
  testSearchTutorials,
  testGetSingleTutorial,
  testUpdateTutorial,
  testTogglePublishStatus,
  testDeleteTutorial,
  testBulkDeleteTutorials,
  testBulkUpdateStatus,
  testCompleteWorkflow,
  sampleTutorials
}

export default tutorialApiTests
