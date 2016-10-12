<?php
return array(

	/**
	 * Menu items and titles
	 */
	'groups' => "Community",
        'item:group' => "Communities",
	'groups:owned' => "Community I own",
	'groups:owned:user' => 'Community %s owns',
	'groups:yours' => "My Community",
	'groups:user' => "%s's Community",
	'groups:all' => "All Community",
	'groups:add' => "Create a new Community",
	'groups:edit' => "Edit Community",
	'groups:delete' => 'Delete Community',
	'groups:membershiprequests' => 'Manage join requests',
	'groups:membershiprequests:pending' => 'Manage join requests (%s)',
	'groups:invitations' => 'Community invitations',
	'groups:invitations:pending' => 'Community invitations (%s)',

	'groups:icon' => 'Community icon (leave blank to leave unchanged)',
	'groups:name' => 'Community name',
	'groups:username' => 'Community short name (displayed in URLs, alphanumeric characters only)',
	'groups:description' => 'Description',
	'groups:briefdescription' => 'Brief description',
	'groups:interests' => 'Tags',
	'groups:website' => 'Website',
	'groups:members' => 'Community members',
	'groups:my_status' => 'My status',
	'groups:my_status:group_owner' => 'You own this community',
	'groups:my_status:group_member' => 'You are in this community',
	'groups:subscribed' => 'Community notifications on',
	'groups:unsubscribed' => 'Community notifications off',

	'groups:members:title' => 'Members of %s',
	'groups:members:more' => "View all members",
	'groups:membership' => "Community membership permissions",
	'groups:content_access_mode' => "Accessibility of community content",
	'groups:content_access_mode:warning' => "Warning: Changing this setting won't change the access permission of existing community content.",
	'groups:content_access_mode:unrestricted' => "Unrestricted - Access depends on content-level settings",
	'groups:content_access_mode:membersonly' => "Members Only - Non-members can never access community content",
	'groups:access' => "Access permissions",
	'groups:owner' => "Owner",
	'groups:owner:warning' => "Warning: if you change this value, you will no longer be the owner of this community.",
	'groups:widget:num_display' => 'Number of community to display',
	'groups:widget:membership' => 'Community membership',
	'groups:widgets:description' => 'Display the community you are a member of on your profile',

	'groups:widget:group_activity:title' => 'Community activity',
	'groups:widget:group_activity:description' => 'View the activity in one of your community',
	'groups:widget:group_activity:edit:select' => 'Select a community',
	'groups:widget:group_activity:content:noactivity' => 'There is no activity in this community',
	'groups:widget:group_activity:content:noselect' => 'Edit this widget to select a community',

	'groups:noaccess' => 'No access to Community',
	'groups:permissions:error' => 'You do not have the permissions for this',
	'groups:ingroup' => 'in the Community',
	'groups:cantcreate' => 'You can not create a Community. Only admins can.',
	'groups:cantedit' => 'You can not edit this Community',
	'groups:saved' => 'Community saved',
	'groups:save_error' => 'Community could not be saved',
	'groups:featured' => 'Featured' ,
	'groups:makeunfeatured' => 'Unfeature',
	'groups:makefeatured' => 'Make featured',
	'groups:featuredon' => '%s is now a featured Community.',
	'groups:unfeatured' => '%s has been removed from the featured Community.',
	'groups:featured_error' => 'Invalid Community.',
	'groups:nofeatured' => 'No featured Community',
	'groups:joinrequest' => 'Request membership',
	'groups:join' => 'Join Community',
	'groups:leave' => 'Leave Community',
	'groups:invite' => 'Invite friends',
	'groups:invite:title' => 'Invite friends to this Community',
	'groups:inviteto' => "Invite friends to '%s'",
	'groups:nofriends' => "You have no friends left who have not been invited to this community.",
	'groups:nofriendsatall' => 'You have no friends to invite!',
	'groups:viagroups' => "via community",
	'groups:group' => "Community",
	'groups:search:tags' => "tag",
	'groups:search:title' => "Search for community tagged with '%s'",
	'groups:search:none' => "No matching community were found",
	'groups:search_in_group' => "Search in this Community",
	'groups:acl' => "Group: %s",

	'discussion:topic:notify:summary' => 'New discussion topic called %s',
	'discussion:topic:notify:subject' => 'New discussion topic: %s',
	'discussion:topic:notify:body' =>
'%s added a new discussion topic to the Community %s:

Title: %s

%s

View and reply to the discussion topic:
%s
',

	'discussion:reply:notify:summary' => 'New reply in topic: %s',
	'discussion:reply:notify:subject' => 'New reply in topic: %s',
	'discussion:reply:notify:body' =>
'%s replied to the discussion topic %s in the Community %s:

%s

View and reply to the discussion:
%s
',

	'groups:activity' => "Community activity",
	'groups:enableactivity' => 'Enable community activity',
	'groups:activity:none' => "There is no community activity yet",

	'groups:notfound' => "Community not found",
	'groups:notfound:details' => "The requested community either does not exist or you do not have access to it",

	'groups:requests:none' => 'There are no current membership requests.',

	'groups:invitations:none' => 'There are no current invitations.',

	'item:object:groupforumtopic' => "Discussion topics",
	'item:object:discussion_reply' => "Discussion replies",

	'groupforumtopic:new' => "Add discussion post",

	'groups:count' => "community created",
	'groups:open' => "open community",
	'groups:closed' => "closed community",
	'groups:member' => "members",
	'groups:searchtag' => "Search for communities by tag",

	'groups:more' => 'More Community',
	'groups:none' => 'No Community',

	/**
	 * Access
	 */
	'groups:access:private' => 'Closed - Users must be invited',
	'groups:access:public' => 'Open - Any user may join',
	'groups:access:group' => 'Community members only',
	'groups:closedgroup' => "This community's membership is closed.",
	'groups:closedgroup:request' => 'To ask to be added, click the "Request membership" menu link.',
	'groups:closedgroup:membersonly' => "This community's membership is closed and its content is accessible only by members.",
	'groups:opengroup:membersonly' => "This community's content is accessible only by members.",
	'groups:opengroup:membersonly:join' => 'To be a member, click the "Join community" menu link.',
	'groups:visibility' => 'Who can see this Community?',

	/**
	 * Community tools
	 */
	'groups:enableforum' => 'Enable community discussion',
	'groups:lastupdated' => 'Last updated %s by %s',
	'groups:lastcomment' => 'Last comment %s by %s',

	/**
	 * Community discussion
	 */
	'discussion' => 'Discussion',
	'discussion:add' => 'Add discussion topic',
	'discussion:latest' => 'Latest discussion',
	'discussion:group' => 'Community discussion',
	'discussion:none' => 'No discussion',
	'discussion:reply:title' => 'Reply by %s',

	'discussion:topic:created' => 'The discussion topic was created.',
	'discussion:topic:updated' => 'The discussion topic was updated.',
	'discussion:topic:deleted' => 'Discussion topic has been deleted.',

	'discussion:topic:notfound' => 'Discussion topic not found',
	'discussion:error:notsaved' => 'Unable to save this topic',
	'discussion:error:missing' => 'Both title and message are required fields',
	'discussion:error:permissions' => 'You do not have permissions to perform this action',
	'discussion:error:notdeleted' => 'Could not delete the discussion topic',

	'discussion:reply:edit' => 'Edit reply',
	'discussion:reply:deleted' => 'Discussion reply has been deleted.',
	'discussion:reply:error:notfound' => 'The discussion reply was not found',
	'discussion:reply:error:notfound_fallback' => "Sorry, we could not find the specified reply, but we've forwarded you to the original discussion topic.",
	'discussion:reply:error:notdeleted' => 'Could not delete the discussion reply',

	'discussion:search:title' => 'Reply on topic: %s',
	
	'admin:groups' => 'Community',

	'reply:this' => 'Reply to this',

	'group:replies' => 'Replies',
	'groups:forum:created' => 'Created %s with %d comments',
	'groups:forum:created:single' => 'Created %s with %d reply',
	'groups:forum' => 'Discussion',
	'groups:addtopic' => 'Add a topic',
	'groups:forumlatest' => 'Latest discussion',
	'groups:latestdiscussion' => 'Latest discussion',
	'groupspost:success' => 'Your reply was succesfully posted',
	'groupspost:failure' => 'There was problem while posting your reply',
	'groups:alldiscussion' => 'Latest discussion',
	'groups:edittopic' => 'Edit topic',
	'groups:topicmessage' => 'Topic message',
	'groups:topicstatus' => 'Topic status',
	'groups:reply' => 'Post a comment',
	'groups:topic' => 'Topic',
	'groups:posts' => 'Posts',
	'groups:lastperson' => 'Last person',
	'groups:when' => 'When',
	'grouptopic:notcreated' => 'No topics have been created.',
	'groups:topicclosed' => 'Closed',
	'grouptopic:created' => 'Your topic was created.',
	'groups:topicsticky' => 'Sticky',
	'groups:topicisclosed' => 'This discussion is closed.',
	'groups:topiccloseddesc' => 'This discussion is closed and is not accepting new comments.',
	'grouptopic:error' => 'Your community topic could not be created. Please try again or contact a system administrator.',
	'groups:forumpost:edited' => "You have successfully edited the forum post.",
	'groups:forumpost:error' => "There was a problem editing the forum post.",

	'groups:privategroup' => 'This community is closed. Requesting membership.',
	'groups:notitle' => 'Community must have a title',
	'groups:cantjoin' => 'Can not join community',
	'groups:cantleave' => 'Could not leave community',
	'groups:removeuser' => 'Remove from community',
	'groups:cantremove' => 'Cannot remove user from community',
	'groups:removed' => 'Successfully removed %s from community',
	'groups:addedtogroup' => 'Successfully added the user to the community',
	'groups:joinrequestnotmade' => 'Could not request to join community',
	'groups:joinrequestmade' => 'Requested to join community',
	'groups:joined' => 'Successfully joined community!',
	'groups:left' => 'Successfully left community',
	'groups:notowner' => 'Sorry, you are not the owner of this community.',
	'groups:notmember' => 'Sorry, you are not a member of this community.',
	'groups:alreadymember' => 'You are already a member of this community!',
	'groups:userinvited' => 'User has been invited.',
	'groups:usernotinvited' => 'User could not be invited.',
	'groups:useralreadyinvited' => 'User has already been invited',
	'groups:invite:subject' => "%s you have been invited to join %s!",
	'groups:updated' => "Last reply by %s %s",
	'groups:started' => "Started by %s",
	'groups:joinrequest:remove:check' => 'Are you sure you want to remove this join request?',
	'groups:invite:remove:check' => 'Are you sure you want to remove this invitation?',
	'groups:invite:body' => "Hi %s,

%s invited you to join the '%s' Community. Click below to view your invitations:

%s",

	'groups:welcome:subject' => "Welcome to the %s Community!",
	'groups:welcome:body' => "Hi %s!

You are now a member of the '%s' Community! Click below to begin posting!

%s",

	'groups:request:subject' => "%s has requested to join %s",
	'groups:request:body' => "Hi %s,

%s has requested to join the '%s' community. Click below to view their profile:

%s

or click below to view the Community's join requests:

%s",

	/**
	 * Forum river items
	 */

	'river:create:group:default' => '%s created the Community %s',
	'river:join:group:default' => '%s joined the Community %s',
	'river:create:object:groupforumtopic' => '%s added a new discussion topic %s',
	'river:reply:object:groupforumtopic' => '%s replied on the discussion topic %s',
	'river:reply:view' => 'view reply',

	'groups:nowidgets' => 'No widgets have been defined for this community.',


	'groups:widgets:members:title' => 'Community members',
	'groups:widgets:members:description' => 'List the members of a Community.',
	'groups:widgets:members:label:displaynum' => 'List the members of a community.',
	'groups:widgets:members:label:pleaseedit' => 'Please configure this widget.',

	'groups:widgets:entities:title' => "Objects in Community",
	'groups:widgets:entities:description' => "List the objects saved in this Community",
	'groups:widgets:entities:label:displaynum' => 'List the objects of a community.',
	'groups:widgets:entities:label:pleaseedit' => 'Please configure this widget.',

	'groups:forumtopic:edited' => 'Forum topic successfully edited.',

	'groups:allowhiddengroups' => 'Do you want to allow private (invisible) community?',
	'groups:whocancreate' => 'Who can create new community?',

	/**
	 * Action messages
	 */
	'group:deleted' => 'Community and Community contents deleted',
	'group:notdeleted' => 'Community could not be deleted',

	'group:notfound' => 'Could not find the community',
	'grouppost:deleted' => 'Community posting successfully deleted',
	'grouppost:notdeleted' => 'Community posting could not be deleted',
	'groupstopic:deleted' => 'Topic deleted',
	'groupstopic:notdeleted' => 'Topic not deleted',
	'grouptopic:blank' => 'No topic',
	'grouptopic:notfound' => 'Could not find the topic',
	'grouppost:nopost' => 'Empty post',
	'groups:deletewarning' => "Are you sure you want to delete this community? There is no undo!",

	'groups:invitekilled' => 'The invite has been deleted.',
	'groups:joinrequestkilled' => 'The join request has been deleted.',
	'groups:error:addedtogroup' => "Could not add %s to the community",
	'groups:add:alreadymember' => "%s is already a member of this community",

	/**
	 * ecml
	 */
	'groups:ecml:discussion' => 'Community Discussions',
	'groups:ecml:groupprofile' => 'Community profiles',
);
