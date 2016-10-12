<?php
return array(
	'blog' => 'News',
	'blog:blogs' => 'News',
	'blog:revisions' => 'Revisions',
	'blog:archives' => 'Archives',
	'blog:blog' => 'News',
	'item:object:blog' => 'News',

	'blog:title:user_blogs' => '%s\'s news',
	'blog:title:all_blogs' => 'All site news',
	'blog:title:friends' => 'Friends\' news',

	'blog:group' => 'Group news',
	'blog:enableblog' => 'Enable group news',
	'blog:write' => 'Write a news post',

	// Editing
	'blog:add' => 'Add news post',
	'blog:edit' => 'Edit news post',
	'blog:excerpt' => 'Excerpt',
	'blog:body' => 'Body',
	'blog:save_status' => 'Last saved: ',
	
	'blog:revision' => 'Revision',
	'blog:auto_saved_revision' => 'Auto Saved Revision',

	// messages
	'blog:message:saved' => 'News post saved.',
	'blog:error:cannot_save' => 'Cannot save news post.',
	'blog:error:cannot_auto_save' => 'Cannot automatically save news post.',
	'blog:error:cannot_write_to_container' => 'Insufficient access to save news to group.',
	'blog:messages:warning:draft' => 'There is an unsaved draft of this post!',
	'blog:edit_revision_notice' => '(Old version)',
	'blog:message:deleted_post' => 'News post deleted.',
	'blog:error:cannot_delete_post' => 'Cannot delete news post.',
	'blog:none' => 'No news posts',
	'blog:error:missing:title' => 'Please enter a news title!',
	'blog:error:missing:description' => 'Please enter the body of your news!',
	'blog:error:cannot_edit_post' => 'This post may not exist or you may not have permissions to edit it.',
	'blog:error:post_not_found' => 'Cannot find specified news post.',
	'blog:error:revision_not_found' => 'Cannot find this revision.',

	// river
	'river:create:object:blog' => '%s published a news post %s',
	'river:comment:object:blog' => '%s commented on the news %s',

	// notifications
	'blog:notify:summary' => 'New news post called %s',
	'blog:notify:subject' => 'New news post: %s',
	'blog:notify:body' =>
'
%s published a new news post: %s

%s

View and comment on the news post:
%s
',

	// widget
	'blog:widget:description' => 'Display your latest news posts',
	'blog:moreblogs' => 'More news posts',
	'blog:numbertodisplay' => 'Number of news posts to display',
	'blog:noblogs' => 'No news posts'
);