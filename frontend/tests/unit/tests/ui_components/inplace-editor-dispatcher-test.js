//-- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

/*jshint expr: true*/

describe('inplaceEditor Dispatcher', function() {
  var scope, dispatcher;

  beforeEach(module('openproject.services'));
  beforeEach(inject(function($rootScope, InplaceEditorDispatcher) {
    scope = $rootScope.$new();

    dispatcher = InplaceEditorDispatcher;
  }));

  describe('setReadValue', function() {
    context('when type is select2', function() {
      beforeEach(function() {
        scope.attribute = 'status.name';
        scope.type = 'select2';
        scope.embedded = true;
      });
      context('when element is editable', function() {
        beforeEach(function() {
          scope.isEditable = false;
          sinon.spy(dispatcher, '_setEmbeddedOptions');
          sinon.stub(dispatcher, '_getReadAttributeValue');
          dispatcher.dispatchHook(scope, 'setReadValue', {});
        });

        it('sets not the embedded options eagerly', function() {
          expect(dispatcher._setEmbeddedOptions).to.not.have.been.called;
        });
      });
    });
  });

  describe('formattable', function() {
    var text = 'Raw text for my formattable!';
    var data = {
      description: {
        format: '',
        html: '',
        raw: ''
      }
    };

    beforeEach(function() {
      scope.attribute = 'description';
      scope.dataObject = { value: text };
      scope.type = 'wiki_textarea';

      dispatcher.dispatchHook(scope, 'submit', data);
    });

    it('should set raw attribute', function() {
      expect(data.description.raw).to.equal(text);
    });
  });
});
